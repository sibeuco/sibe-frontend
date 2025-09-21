import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Actividad, EstadoActividad } from 'src/app/shared/model/actividad.model';

@Component({
  selector: 'app-acompanamiento-sub-area-activity-attendance',
  templateUrl: './acompanamiento-sub-area-activity-attendance.component.html',
  styleUrls: ['./acompanamiento-sub-area-activity-attendance.component.scss']
})
export class AcompanamientoSubAreaActivityAttendanceComponent implements OnInit {
  
  actividadSeleccionada: Actividad | null = null;
  actividadId: number | null = null;
  nombreActividad: string = '';
  colaborador: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Obtener los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      this.actividadId = params['actividadId'] ? +params['actividadId'] : null;
      this.nombreActividad = params['nombreActividad'] || '';
      this.colaborador = params['colaborador'] || '';
      
      if (this.actividadId) {
        console.log('Actividad seleccionada para asistencia:', {
          id: this.actividadId,
          nombre: this.nombreActividad,
          colaborador: this.colaborador
        });
        
        // Aquí puedes cargar los datos completos de la actividad desde tu servicio
        this.cargarActividad(this.actividadId);
      }
    });
  }

  /**
   * Carga los datos completos de la actividad
   * @param actividadId - ID de la actividad
   */
  private cargarActividad(actividadId: number): void {
    // Aquí puedes llamar a tu servicio para obtener los datos completos de la actividad
    // Por ahora, creamos un objeto temporal con los datos disponibles
    this.actividadSeleccionada = {
      id: actividadId,
      nombreActividad: this.nombreActividad,
      colaborador: this.colaborador,
      fechaCreacion: new Date(),
      estado: EstadoActividad.PENDIENTE
    };
    
    console.log('Actividad cargada:', this.actividadSeleccionada);
  }

  /**
   * Método para volver a la lista de actividades
   */
  volverAActividades(): void {
    // Navegar de vuelta a la lista de actividades
    window.history.back();
  }
}
