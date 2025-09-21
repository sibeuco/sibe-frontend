import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcompanamientoSubAreaComponent } from './components/acompanamiento-sub-area.component';

const routes: Routes = [{ path: '', component: AcompanamientoSubAreaComponent },
  { path: 'asistencia-actividad', loadChildren: () => import('./modules/acompanamiento-sub-area-activity-attendance/acompanamiento-sub-area-activity-attendance.module').then(m => m.AcompanamientoSubAreaActivityAttendanceModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcompanamientoSubAreaRoutingModule { }
