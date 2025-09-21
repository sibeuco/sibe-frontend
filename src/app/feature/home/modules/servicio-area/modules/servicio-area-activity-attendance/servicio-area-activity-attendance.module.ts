import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicioAreaActivityAttendanceRoutingModule } from './servicio-area-activity-attendance-routing.module';
import { ServicioAreaActivityAttendanceComponent } from './components/servicio-area-activity-attendance.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ServicioAreaActivityAttendanceComponent
  ],
  imports: [
    CommonModule,
    ServicioAreaActivityAttendanceRoutingModule,
    SharedModule
  ]
})
export class ServicioAreaActivityAttendanceModule { }
