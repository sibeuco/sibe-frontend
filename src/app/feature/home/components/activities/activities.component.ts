import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityResponse} from 'src/app/shared/model/activity.model';
import { ActivitiesTableComponent } from 'src/app/shared/components/activities-table/activities-table.component';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements AfterViewInit {

  terminoBusqueda: string = '';
  nombreArea: string = 'Dirección de Bienestar y Evangelización';
  tipoEstructura: 'direccion' | 'area' | 'subarea' = 'direccion';
  
  @ViewChild(ActivitiesTableComponent) activitiesTable!: ActivitiesTableComponent;
  
  constructor(private router: Router) {}

  ngAfterViewInit(): void {
  }

  onActividadSeleccionada(actividad: ActivityResponse): void {
    console.log('Actividad seleccionada:', actividad);
    
    console.log(`Procesando actividad: ${actividad.nombre}`);
  }

  onBuscarActividad(termino: string): void {
    this.terminoBusqueda = termino;
    console.log('Buscando actividades con término:', termino);
  }

  onActividadCreada(): void {
    if (this.activitiesTable) {
      this.activitiesTable.recargarActividades();
    }
  }

}
