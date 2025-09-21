import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeportesSubAreaActivityAttendanceRoutingModule } from './deportes-sub-area-activity-attendance-routing.module';
import { DeportesSubAreaActivityAttendanceComponent } from './components/deportes-sub-area-activity-attendance.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    DeportesSubAreaActivityAttendanceComponent
  ],
  imports: [
    CommonModule,
    DeportesSubAreaActivityAttendanceRoutingModule,
    SharedModule
  ]
})
export class DeportesSubAreaActivityAttendanceModule { }
