import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanchaSubAreaActivityAttendanceComponent } from './components/cancha-sub-area-activity-attendance.component';

const routes: Routes = [{ path: '', component: CanchaSubAreaActivityAttendanceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CanchaSubAreaActivityAttendanceRoutingModule { }
