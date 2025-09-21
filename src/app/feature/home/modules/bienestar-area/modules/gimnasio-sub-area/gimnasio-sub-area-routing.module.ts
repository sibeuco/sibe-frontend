import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GimnasioSubAreaComponent } from './components/gimnasio-sub-area.component';

const routes: Routes = [{ path: '', component: GimnasioSubAreaComponent },
  { path: 'asistencia-actividad', loadChildren: () => import('./modules/gimnasio-sub-area-activity-attendance/gimnasio-sub-area-activity-attendance.module').then(m => m.GimnasioSubAreaActivityAttendanceModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GimnasioSubAreaRoutingModule { }
