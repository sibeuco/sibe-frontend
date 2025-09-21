import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvangelizacionAreaActivityAttendanceComponent } from './components/evangelizacion-area-activity-attendance.component';

const routes: Routes = [{ path: '', component: EvangelizacionAreaActivityAttendanceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvangelizacionAreaActivityAttendanceRoutingModule { }
