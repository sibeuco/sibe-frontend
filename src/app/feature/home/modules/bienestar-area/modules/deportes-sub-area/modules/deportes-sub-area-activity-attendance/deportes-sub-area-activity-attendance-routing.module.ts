import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeportesSubAreaActivityAttendanceComponent } from './components/deportes-sub-area-activity-attendance.component';

const routes: Routes = [{ path: '', component: DeportesSubAreaActivityAttendanceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeportesSubAreaActivityAttendanceRoutingModule { }
