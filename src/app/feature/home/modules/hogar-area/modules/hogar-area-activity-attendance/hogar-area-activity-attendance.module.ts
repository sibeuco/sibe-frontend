import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HogarAreaActivityAttendanceRoutingModule } from './hogar-area-activity-attendance-routing.module';
import { HogarAreaActivityAttendanceComponent } from './components/hogar-area-activity-attendance.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    HogarAreaActivityAttendanceComponent
  ],
  imports: [
    CommonModule,
    HogarAreaActivityAttendanceRoutingModule,
    SharedModule
  ]
})
export class HogarAreaActivityAttendanceModule { }
