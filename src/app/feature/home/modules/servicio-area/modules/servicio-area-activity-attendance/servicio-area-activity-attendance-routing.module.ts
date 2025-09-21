import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicioAreaActivityAttendanceComponent } from './components/servicio-area-activity-attendance.component';

const routes: Routes = [{ path: '', component: ServicioAreaActivityAttendanceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicioAreaActivityAttendanceRoutingModule { }
