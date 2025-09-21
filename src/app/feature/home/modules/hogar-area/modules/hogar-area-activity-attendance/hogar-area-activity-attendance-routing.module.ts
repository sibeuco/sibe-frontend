import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HogarAreaActivityAttendanceComponent } from './components/hogar-area-activity-attendance.component';

const routes: Routes = [{ path: '', component: HogarAreaActivityAttendanceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HogarAreaActivityAttendanceRoutingModule { }
