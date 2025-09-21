import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HogarAreaComponent } from './components/hogar-area.component';

const routes: Routes = [{ path: '', component: HogarAreaComponent },
  { path: 'asistencia-actividad', loadChildren: () => import('./modules/hogar-area-activity-attendance/hogar-area-activity-attendance.module').then(m => m.HogarAreaActivityAttendanceModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HogarAreaRoutingModule { }
