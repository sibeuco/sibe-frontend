import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienestarAreaActivityAttendanceComponent } from './components/bienestar-area-activity-attendance.component';

const routes: Routes = [{ path: '', component: BienestarAreaActivityAttendanceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BienestarAreaActivityAttendanceRoutingModule { }
