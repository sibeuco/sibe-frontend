import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GimnasioSubAreaActivityAttendanceComponent } from './components/gimnasio-sub-area-activity-attendance.component';

const routes: Routes = [{ path: '', component: GimnasioSubAreaActivityAttendanceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GimnasioSubAreaActivityAttendanceRoutingModule { }
