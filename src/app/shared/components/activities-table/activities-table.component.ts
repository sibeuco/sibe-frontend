import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Actividad, EstadoActividad } from '../../model/actividad.model';
import { FechaProgramada, EstadoFechaProgramada } from '../../model/fecha-programada.model';

@Component({
  selector: 'app-activities-table',
  templateUrl: './activities-table.component.html',
  styleUrls: ['./activities-table.component.scss']
})
export class ActivitiesTableComponent implements OnInit, OnChanges {
  @Input() actividades: Actividad[] = [];
  @Input() rutaRedireccion: string = '';
  @Input() terminoBusqueda: string = '';
  @Output() actividadSeleccionada = new EventEmitter<Actividad>();

  // Propiedades para ordenamiento
  columnaOrdenamiento: string = '';
  direccionOrdenamiento: 'asc' | 'desc' = 'asc';
  actividadesOrdenadas: Actividad[] = [];

  // Propiedades para el modal de fechas programadas
  actividadSeleccionadaParaModal: Actividad | null = null;
  fechasProgramadas: FechaProgramada[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.aplicarFiltrosYOrdenamiento();
  }

  ngOnChanges() {
    this.aplicarFiltrosYOrdenamiento();
  }

  /**
   * Aplica filtros de búsqueda y ordenamiento a las actividades
   */
  private aplicarFiltrosYOrdenamiento(): void {
    // Primero aplicar filtro de búsqueda
    let actividadesFiltradas = this.actividades;
    
    if (this.terminoBusqueda && this.terminoBusqueda.trim() !== '') {
      const termino = this.terminoBusqueda.toLowerCase().trim();
      actividadesFiltradas = this.actividades.filter(actividad => 
        actividad.nombreActividad.toLowerCase().includes(termino) ||
        actividad.colaborador.toLowerCase().includes(termino) ||
        actividad.estado.toLowerCase().includes(termino) ||
        (actividad.fechaProgramada && actividad.fechaProgramada.toLocaleDateString().toLowerCase().includes(termino))
      );
    }
    
    // Luego aplicar ordenamiento
    this.actividadesOrdenadas = [...actividadesFiltradas];
    if (this.columnaOrdenamiento) {
      this.ordenarPorColumna(this.columnaOrdenamiento, this.direccionOrdenamiento);
    }
  }

  /**
   * Maneja el clic en el encabezado de una columna para ordenar
   */
  ordenarPor(columna: string): void {
    if (this.columnaOrdenamiento === columna) {
      // Si ya está ordenando por esta columna, cambiar la dirección
      this.direccionOrdenamiento = this.direccionOrdenamiento === 'asc' ? 'desc' : 'asc';
    } else {
      // Si es una nueva columna, empezar con ascendente
      this.columnaOrdenamiento = columna;
      this.direccionOrdenamiento = 'asc';
    }
    
    this.aplicarFiltrosYOrdenamiento();
  }

  /**
   * Ordena las actividades por la columna especificada
   */
  private ordenarPorColumna(columna: string, direccion: 'asc' | 'desc'): void {
    this.actividadesOrdenadas.sort((a, b) => {
      let valorA: any;
      let valorB: any;

      switch (columna) {
        case 'nombreActividad':
          valorA = a.nombreActividad.toLowerCase();
          valorB = b.nombreActividad.toLowerCase();
          break;
        case 'colaborador':
          valorA = a.colaborador.toLowerCase();
          valorB = b.colaborador.toLowerCase();
          break;
        case 'fechaCreacion':
          valorA = new Date(a.fechaCreacion).getTime();
          valorB = new Date(b.fechaCreacion).getTime();
          break;
        case 'fechaProgramada':
          valorA = a.fechaProgramada ? new Date(a.fechaProgramada).getTime() : 0;
          valorB = b.fechaProgramada ? new Date(b.fechaProgramada).getTime() : 0;
          break;
        case 'estado':
          valorA = a.estado.toLowerCase();
          valorB = b.estado.toLowerCase();
          break;
        default:
          return 0;
      }

      if (valorA < valorB) {
        return direccion === 'asc' ? -1 : 1;
      }
      if (valorA > valorB) {
        return direccion === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  /**
   * Obtiene la clase CSS para el indicador de ordenamiento
   */
  getSortClass(columna: string): string {
    if (this.columnaOrdenamiento !== columna) {
      return 'sort-indicator';
    }
    return `sort-indicator sort-${this.direccionOrdenamiento}`;
  }

  /**
   * Función para realizar el tracking de las actividades por ID
   */
  trackByActividadId(index: number, actividad: Actividad): number {
    return actividad.id;
  }

  /**
   * Obtiene la clase CSS para el estado de la actividad
   */
  getStatusClass(estado: EstadoActividad): string {
    switch (estado) {
      case EstadoActividad.PENDIENTE:
        return 'status-pendiente';
      case EstadoActividad.EN_CURSO:
        return 'status-en-curso';
      case EstadoActividad.FINALIZADO:
        return 'status-finalizado';
      default:
        return 'status-pendiente';
    }
  }

  /**
   * Maneja el clic en el botón "Gestionar Actividad"
   */
  realizarActividad(actividad: Actividad): void {
    // Emitir evento para que el componente padre maneje la lógica
    this.actividadSeleccionada.emit(actividad);
    
    // Configurar datos para el modal
    this.actividadSeleccionadaParaModal = actividad;
    this.cargarFechasProgramadas(actividad.id);
    
    // Abrir el modal
    this.abrirModalFechas();
  }

  /**
   * Carga las fechas programadas para una actividad específica
   */
  private cargarFechasProgramadas(actividadId: number): void {
    // TODO: Aquí deberías hacer una llamada al servicio para obtener las fechas programadas
    // Por ahora, creamos datos de ejemplo
    this.fechasProgramadas = [
      {
        id: 1,
        fecha: new Date('2024-01-15'),
        estado: EstadoFechaProgramada.PENDIENTE,
        actividadId: actividadId
      },
      {
        id: 2,
        fecha: new Date('2024-01-22'),
        estado: EstadoFechaProgramada.EN_CURSO,
        actividadId: actividadId
      },
      {
        id: 3,
        fecha: new Date('2024-01-29'),
        estado: EstadoFechaProgramada.FINALIZADO,
        actividadId: actividadId
      }
    ];
  }

  /**
   * Abre el modal de fechas programadas
   */
  private abrirModalFechas(): void {
    // Usar Bootstrap modal API
    const modalElement = document.getElementById('date-selector-modal');
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  /**
   * Cierra el modal de fechas programadas
   */
  cerrarModalFechas(): void {
    const modalElement = document.getElementById('date-selector-modal');
    if (modalElement) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
    this.actividadSeleccionadaParaModal = null;
    this.fechasProgramadas = [];
  }

  /**
   * Maneja el clic en el botón "Ver" de una fecha programada
   */
  verFechaProgramada(fechaProgramada: FechaProgramada): void {
    console.log('Ver fecha programada:', fechaProgramada);
    // TODO: Implementar la lógica para ver los detalles de la fecha programada
    // Esto podría abrir otro modal o navegar a una página de detalles
  }

}
