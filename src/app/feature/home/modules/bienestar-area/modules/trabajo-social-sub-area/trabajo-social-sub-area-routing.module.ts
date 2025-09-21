import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrabajoSocialSubAreaComponent } from './components/trabajo-social-sub-area.component';

const routes: Routes = [{ path: '', component: TrabajoSocialSubAreaComponent },
  { path: 'asistencia-actividad', loadChildren: () => import('./modules/trabajo-social-sub-area-activity-attendance/trabajo-social-sub-area-activity-attendance.module').then(m => m.TrabajoSocialSubAreaActivityAttendanceModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrabajoSocialSubAreaRoutingModule { }
