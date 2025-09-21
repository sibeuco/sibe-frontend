import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CanchaSubAreaActivityAttendanceRoutingModule } from './cancha-sub-area-activity-attendance-routing.module';
import { CanchaSubAreaActivityAttendanceComponent } from './components/cancha-sub-area-activity-attendance.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CanchaSubAreaActivityAttendanceComponent
  ],
  imports: [
    CommonModule,
    CanchaSubAreaActivityAttendanceRoutingModule,
    SharedModule
  ]
})
export class CanchaSubAreaActivityAttendanceModule { }
