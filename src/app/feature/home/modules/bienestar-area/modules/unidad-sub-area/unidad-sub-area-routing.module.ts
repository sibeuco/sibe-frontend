import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnidadSubAreaComponent } from './components/unidad-sub-area.component';

const routes: Routes = [{ path: '', component: UnidadSubAreaComponent },
  { path: 'asistencia-actividad', loadChildren: () => import('./modules/unidad-sub-area-activity-attendance/unidad-sub-area-activity-attendance.module').then(m => m.UnidadSubAreaActivityAttendanceModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnidadSubAreaRoutingModule { }
