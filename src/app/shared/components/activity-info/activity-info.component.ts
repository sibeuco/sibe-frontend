import { Component, Input, OnInit } from '@angular/core';

export interface ActividadInfo {
  nombre: string;
  colaborador: string;
  objetivo: string;
  indicador: string;
  fechaProgramada?: string;
  estado: string; // Mantenemos el estado internamente para la lógica
  fechaRealizacion?: string;
}

@Component({
  selector: 'app-activity-info',
  templateUrl: './activity-info.component.html',
  styleUrls: ['./activity-info.component.scss']
})
export class ActivityInfoComponent implements OnInit {

  @Input() actividad: ActividadInfo | null = null;
  
  fechaActual: string = '';

  actividadesEjemplo: ActividadInfo[] = [
    {
      nombre: 'Taller de Bienestar Estudiantil',
      colaborador: 'María González Pérez',
      objetivo: 'Promover el bienestar integral de los estudiantes a través de actividades recreativas y de desarrollo personal',
      indicador: 'Satisfacción grupos de Interés - eficacia',
      fechaProgramada: '2024-12-25',
      estado: 'FINALIZADA',
      fechaRealizacion: '2024-12-25'
    },
    {
      nombre: 'Programa de Evangelización Comunitaria',
      colaborador: 'Carlos Rodríguez Martínez',
      objetivo: 'Fortalecer los valores espirituales y la fe en la comunidad universitaria mediante actividades de evangelización',
      indicador: 'Nivel satisfacción - impacto',
      fechaProgramada: '2024-12-30',
      estado: 'EN_CURSO',
      fechaRealizacion: undefined
    },
    {
      nombre: 'Actividad de Servicio Social',
      colaborador: 'Ana Lucía Herrera',
      objetivo: 'Desarrollar el sentido de responsabilidad social en los estudiantes a través de actividades de servicio comunitario',
      indicador: 'Reducción de quejas y reclamos - efectividad',
      fechaProgramada: '2025-01-15',
      estado: 'FINALIZADA',
      fechaRealizacion: '2024-12-25'
    }
  ];

  actividadEjemplo: ActividadInfo = this.actividadesEjemplo[2];

  ngOnInit(): void {
    if (!this.actividad) {
      this.actividad = this.actividadEjemplo;
    }
  }

  // Método para formatear la fecha programada si viene en formato ISO
  formatearFechaProgramada(fechaISO: string): string {
    if (!fechaISO) return '';
    const fecha = new Date(fechaISO);
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const año = fecha.getFullYear();
    return `${dia}/${mes}/${año}`;
  }

  // Método para cambiar a una actividad específica de ejemplo (útil para testing)
  cambiarActividadEjemplo(indice: number): void {
    if (indice >= 0 && indice < this.actividadesEjemplo.length) {
      this.actividad = this.actividadesEjemplo[indice];
    }
  }

  // Método para obtener todas las actividades de ejemplo (útil para debugging)
  obtenerActividadesEjemplo(): ActividadInfo[] {
    return this.actividadesEjemplo;
  }

  // Método para verificar si el estado es FINALIZADA
  esActividadFinalizada(): boolean {
    return this.actividad?.estado === 'FINALIZADA';
  }

  // Método para formatear la fecha de realización
  formatearFechaRealizacion(fechaISO: string): string {
    if (!fechaISO) return '';
    const fecha = new Date(fechaISO);
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const año = fecha.getFullYear();
    return `${dia}/${mes}/${año}`;
  }

}
