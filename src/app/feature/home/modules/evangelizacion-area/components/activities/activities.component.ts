import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityResponse } from 'src/app/shared/model/activity.model';
import { ActivitiesTableComponent } from 'src/app/shared/components/activities-table/activities-table.component';
import { StateService } from 'src/app/shared/service/state.service';
import { StateProps } from 'src/app/shared/model/state.enum';
import { UserSession } from 'src/app/feature/login/model/user-session.model';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements AfterViewInit {

  terminoBusqueda: string = '';
  nombreArea: string = 'Evangelización';
  tipoEstructura: 'direccion' | 'area' | 'subarea' = 'area';

  @ViewChild(ActivitiesTableComponent) activitiesTable!: ActivitiesTableComponent;
  esColaborador = false;

  constructor(private router: Router, private stateService: StateService) {
    const session = this.stateService.getState(StateProps.USER_SESSION) as UserSession;
    this.esColaborador = session?.rol === 'COLABORADOR';
  }

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
