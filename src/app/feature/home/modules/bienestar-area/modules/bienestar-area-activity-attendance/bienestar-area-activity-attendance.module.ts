import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BienestarAreaActivityAttendanceRoutingModule } from './bienestar-area-activity-attendance-routing.module';
import { BienestarAreaActivityAttendanceComponent } from './components/bienestar-area-activity-attendance.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    BienestarAreaActivityAttendanceComponent
  ],
  imports: [
    CommonModule,
    BienestarAreaActivityAttendanceRoutingModule,
    SharedModule
  ]
})
export class BienestarAreaActivityAttendanceModule { }
