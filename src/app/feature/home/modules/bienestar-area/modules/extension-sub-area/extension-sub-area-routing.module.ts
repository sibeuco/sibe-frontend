import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExtensionSubAreaComponent } from './components/extension-sub-area.component';

const routes: Routes = [{ path: '', component: ExtensionSubAreaComponent },
  { path: 'asistencia-actividad', loadChildren: () => import('./modules/extension-sub-area-activity-attendance/extension-sub-area-activity-attendance.module').then(m => m.ExtensionSubAreaActivityAttendanceModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtensionSubAreaRoutingModule { }
