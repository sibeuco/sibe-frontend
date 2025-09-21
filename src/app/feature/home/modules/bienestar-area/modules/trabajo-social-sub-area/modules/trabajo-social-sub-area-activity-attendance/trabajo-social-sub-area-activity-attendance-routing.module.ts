import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrabajoSocialSubAreaActivityAttendanceComponent } from './components/trabajo-social-sub-area-activity-attendance.component';

const routes: Routes = [{ path: '', component: TrabajoSocialSubAreaActivityAttendanceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrabajoSocialSubAreaActivityAttendanceRoutingModule { }
