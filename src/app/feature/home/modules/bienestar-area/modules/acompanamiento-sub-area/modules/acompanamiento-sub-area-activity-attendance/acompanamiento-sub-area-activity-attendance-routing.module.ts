import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcompanamientoSubAreaActivityAttendanceComponent } from './components/acompanamiento-sub-area-activity-attendance.component';

const routes: Routes = [{ path: '', component: AcompanamientoSubAreaActivityAttendanceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcompanamientoSubAreaActivityAttendanceRoutingModule { }
