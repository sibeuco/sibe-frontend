import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BandaSubAreaActivityAttendanceComponent } from './components/banda-sub-area-activity-attendance.component';

const routes: Routes = [{ path: '', component: BandaSubAreaActivityAttendanceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BandaSubAreaActivityAttendanceRoutingModule { }
