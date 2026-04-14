import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityResponse } from 'src/app/shared/model/activity.model';
import { ActivitiesTableComponent } from 'src/app/shared/components/activities-table/activities-table.component';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements AfterViewInit {

  terminoBusqueda: string = '';
  nombreArea: string = 'Gimnasio';
  tipoEstructura: 'direccion' | 'area' | 'subarea' = 'subarea';
  
  @ViewChild(ActivitiesTableComponent) activitiesTable!: ActivitiesTableComponent;
  
  constructor(private router: Router) {}

  ngAfterViewInit(): void {
  }

  onActividadSeleccionada(actividad: ActivityResponse): void {
    // Lógica para manejar la actividad seleccionada
  }

  onBuscarActividad(termino: string): void {
    this.terminoBusqueda = termino;
  }

  onActividadCreada(): void {
    if (this.activitiesTable) {
      this.activitiesTable.recargarActividades();
    }
  }

}
