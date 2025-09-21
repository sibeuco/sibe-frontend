import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvangelizacionAreaComponent } from './components/evangelizacion-area.component';

const routes: Routes = [{ path: '', component: EvangelizacionAreaComponent },
  { path: 'asistencia-actividad', loadChildren: () => import('./modules/evangelizacion-area-activity-attendance/evangelizacion-area-activity-attendance.module').then(m => m.EvangelizacionAreaActivityAttendanceModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvangelizacionAreaRoutingModule { }
