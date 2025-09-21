import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BandaSubAreaComponent } from './components/banda-sub-area.component';

const routes: Routes = [{ path: '', component: BandaSubAreaComponent },
  { path: 'asistencia-actividad', loadChildren: () => import('./modules/banda-sub-area-activity-attendance/banda-sub-area-activity-attendance.module').then(m => m.BandaSubAreaActivityAttendanceModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BandaSubAreaRoutingModule { }
