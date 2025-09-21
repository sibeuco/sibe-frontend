import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeportesSubAreaComponent } from './components/deportes-sub-area.component';

const routes: Routes = [{ path: '', component: DeportesSubAreaComponent },
  { path: 'asistencia-actividad', loadChildren: () => import('./modules/deportes-sub-area-activity-attendance/deportes-sub-area-activity-attendance.module').then(m => m.DeportesSubAreaActivityAttendanceModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeportesSubAreaRoutingModule { }
