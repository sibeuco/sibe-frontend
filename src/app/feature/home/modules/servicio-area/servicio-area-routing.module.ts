import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicioAreaComponent } from './components/servicio-area.component';

const routes: Routes = [{ path: '', component: ServicioAreaComponent },
  { path: 'asistencia-actividad', loadChildren: () => import('./modules/servicio-area-activity-attendance/servicio-area-activity-attendance.module').then(m => m.ServicioAreaActivityAttendanceModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicioAreaRoutingModule { }
