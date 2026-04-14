import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityResponse } from 'src/app/shared/model/activity.model';
import { ActivitiesTableComponent } from 'src/app/shared/components/activities-table/activities-table.component';
import { StateService } from 'src/app/shared/service/state.service';
import { StateProps } from 'src/app/shared/model/state.enum';
import { UserSession } from 'src/app/feature/login/model/user-session.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements AfterViewInit, OnDestroy {

  terminoBusqueda: string = '';
  nombreArea: string = 'Cancha sintética';
  tipoEstructura: 'direccion' | 'area' | 'subarea' = 'subarea';

  @ViewChild(ActivitiesTableComponent) activitiesTable!: ActivitiesTableComponent;
  esColaborador = false;
  private sessionSubscription?: Subscription;

  constructor(private router: Router, private stateService: StateService) {
    this.actualizarRol();
    this.sessionSubscription = this.stateService.select<UserSession>(StateProps.USER_SESSION).subscribe(() => {
      this.actualizarRol();
    });
  }

  private actualizarRol(): void {
    const session = this.stateService.getState(StateProps.USER_SESSION) as UserSession;
    const rolesPermitidos = ['ADMINISTRADOR_DIRECCION', 'ADMINISTRADOR_AREA'];
    this.esColaborador = !rolesPermitidos.includes(session?.rol);
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this.sessionSubscription?.unsubscribe();
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
