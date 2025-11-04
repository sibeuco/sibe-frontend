import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actividad, EstadoActividad, ActivityResponse } from 'src/app/shared/model/activity.model';
import { SubAreaService } from 'src/app/shared/service/subarea.service';
import { ActivityService } from 'src/app/shared/service/activity.service';
import { ActivityExecutionResponse } from 'src/app/shared/model/activity-execution.model';
import { UserService } from 'src/app/shared/service/user.service';
import { UserResponse } from 'src/app/shared/model/user.model';
import { forkJoin, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { parsearFechaSinZonaHoraria } from 'src/app/shared/utils/date';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {

  terminoBusqueda: string = '';
  listaActividades: Actividad[] = [];
  cargando = false;
  usuariosMap: Map<string, UserResponse> = new Map();
  
  private readonly NOMBRE_SUBAREA = 'Gimnasio';
  
  constructor(
    private router: Router,
    private subAreaService: SubAreaService,
    private activityService: ActivityService,
    private userService: UserService
  ) {}
  
  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.userService.consultarUsuarios().subscribe({
      next: (usuarios) => {
        usuarios.forEach(usuario => {
          this.usuariosMap.set(usuario.identificador, usuario);
        });
        this.cargarActividades();
      },
      error: () => {
        this.cargarActividades();
      }
    });
  }

  cargarActividades(): void {
    this.cargando = true;
    
    this.subAreaService.consultarPorNombre(this.NOMBRE_SUBAREA).pipe(
      switchMap(subarea => {
        return this.activityService.consultarPorSubarea(subarea.identificador);
      }),
      switchMap(actividades => {
        if (actividades.length === 0) {
          this.listaActividades = [];
          this.cargando = false;
          return of([]);
        }
        
        const ejecucionesObservables = actividades.map(actividad => 
          this.activityService.consultarEjecuciones(actividad.identificador).pipe(
            map(ejecuciones => ({ actividad, ejecuciones })),
            catchError(() => of({ actividad, ejecuciones: [] as ActivityExecutionResponse[] }))
          )
        );
        
        return forkJoin(ejecucionesObservables);
      })
    ).subscribe({
      next: (resultados) => {
        this.listaActividades = resultados.map(({ actividad, ejecuciones }) => {
          const estado = this.calcularEstadoActividad(ejecuciones);
          const fechaProgramada = this.obtenerFechaProgramadaMasCercana(ejecuciones);
          const colaboradorNombre = this.obtenerNombreColaborador(actividad.colaborador);
          
          return {
            id: parseInt(actividad.identificador) || 0,
            nombreActividad: actividad.nombre,
            colaborador: colaboradorNombre,
            fechaCreacion: new Date(),
            fechaProgramada: fechaProgramada,
            estado: estado
          } as Actividad;
        });
        
        this.cargando = false;
      },
      error: (error) => {
        this.listaActividades = [];
        this.cargando = false;
      }
    });
  }

  obtenerNombreColaborador(colaborador: string): string {
    const usuario = this.usuariosMap.get(colaborador);
    if (usuario) {
      return `${usuario.nombres} ${usuario.apellidos}`;
    }
    return colaborador;
  }

  obtenerFechaProgramadaMasCercana(ejecuciones: ActivityExecutionResponse[]): Date | undefined {
    if (!ejecuciones || ejecuciones.length === 0) {
      return undefined;
    }
    
    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0);
    const fechasValidas: Date[] = [];
    
    ejecuciones.forEach(ejecucion => {
      if (ejecucion.fechaProgramada) {
        const fechaString = String(ejecucion.fechaProgramada).trim();
        if (fechaString !== '') {
          try {
            const fecha = parsearFechaSinZonaHoraria(fechaString);
            if (fecha && !isNaN(fecha.getTime())) {
              fechasValidas.push(fecha);
            }
          } catch {
            // Ignorar fechas inválidas
          }
        }
      }
    });
    
    if (fechasValidas.length === 0) {
      return undefined;
    }
    
    let fechaMasCercana = fechasValidas[0];
    let diferenciaMinima = Math.abs(fechaMasCercana.getTime() - fechaActual.getTime());
    
    fechasValidas.forEach(fecha => {
      const diferencia = Math.abs(fecha.getTime() - fechaActual.getTime());
      if (diferencia < diferenciaMinima) {
        diferenciaMinima = diferencia;
        fechaMasCercana = fecha;
      }
    });
    
    return fechaMasCercana;
  }

  calcularEstadoActividad(ejecuciones: ActivityExecutionResponse[]): EstadoActividad {
    if (!ejecuciones || ejecuciones.length === 0) {
      return EstadoActividad.PENDIENTE;
    }
    
    const todasFinalizadas = ejecuciones.every(ejecucion => 
      ejecucion.estadoActividad.nombre.toLowerCase() === 'finalizado'
    );
    
    if (todasFinalizadas) {
      return EstadoActividad.FINALIZADO;
    }
    
    return EstadoActividad.PENDIENTE;
  }

  onActividadSeleccionada(actividad: Actividad): void {
    // Lógica adicional si es necesario
  }

  onActividadCreada(): void {
    this.cargarActividades();
  }

  onBuscarActividad(termino: string): void {
    this.terminoBusqueda = termino;
  }

}
