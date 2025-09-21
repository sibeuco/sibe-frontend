import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Actividad, EstadoActividad } from 'src/app/shared/model/actividad.model';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent {
  
  terminoBusqueda: string = '';
  
  constructor(private router: Router) {}
  
  listaActividades: Actividad[] = [
    {
      id: 1,
      nombreActividad: 'Sesión de Acompañamiento Individual',
      colaborador: 'Dr. María González',
      fechaCreacion: new Date('2024-01-20'),
      estado: EstadoActividad.PENDIENTE
    },
    {
      id: 2,
      nombreActividad: 'Taller de Manejo de Estrés',
      colaborador: 'Psic. Carlos Mendoza',
      fechaCreacion: new Date('2024-01-19'),
      estado: EstadoActividad.EN_CURSO
    },
    {
      id: 3,
      nombreActividad: 'Grupo de Apoyo Estudiantil',
      colaborador: 'Lic. Ana Rodríguez',
      fechaCreacion: new Date('2024-01-18'),
      estado: EstadoActividad.FINALIZADO
    },
    {
      id: 4,
      nombreActividad: 'Seguimiento Académico',
      colaborador: 'Prof. Luis Herrera',
      fechaCreacion: new Date('2024-01-17'),
      estado: EstadoActividad.PENDIENTE
    },
    {
      id: 5,
      nombreActividad: 'Orientación Vocacional',
      colaborador: 'Mg. Patricia Silva',
      fechaCreacion: new Date('2024-01-16'),
      estado: EstadoActividad.PENDIENTE
    },
    {
      id: 5,
      nombreActividad: 'Orientación Vocacional',
      colaborador: 'Mg. Patricia Silva',
      fechaCreacion: new Date('2024-01-16'),
      estado: EstadoActividad.PENDIENTE
    },
    {
      id: 5,
      nombreActividad: 'Orientación Vocacional',
      colaborador: 'Mg. Patricia Silva',
      fechaCreacion: new Date('2024-01-16'),
      estado: EstadoActividad.PENDIENTE
    }
  ];

  onActividadSeleccionada(actividad: Actividad): void {
    console.log('Actividad seleccionada para acompañamiento:', actividad);
    
    // Aquí puedes agregar lógica adicional antes de la redirección
    // Por ejemplo: guardar en un servicio, mostrar confirmación, etc.
    
    if (actividad.estado === EstadoActividad.PENDIENTE) {
      console.log(`Iniciando proceso para: ${actividad.nombreActividad}`);
      
      // Aquí podrías agregar lógica adicional como:
      // - Actualizar el estado de la actividad en la base de datos
      // - Mostrar un modal de confirmación
      // - Guardar logs de auditoría
      // - Enviar notificaciones
      
    } else {
      console.log('La actividad no está en estado Pendiente, no se puede realizar');
    }
  }

  onBuscarActividad(termino: string): void {
    this.terminoBusqueda = termino;
    console.log('Buscando actividades con término:', termino);
  }
}
