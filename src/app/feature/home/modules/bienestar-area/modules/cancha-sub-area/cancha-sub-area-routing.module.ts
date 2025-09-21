import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanchaSubAreaComponent } from './components/cancha-sub-area.component';

const routes: Routes = [{ path: '', component: CanchaSubAreaComponent },
  { path: 'asistencia-actividad', loadChildren: () => import('./modules/cancha-sub-area-activity-attendance/cancha-sub-area-activity-attendance.module').then(m => m.CanchaSubAreaActivityAttendanceModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CanchaSubAreaRoutingModule { }
