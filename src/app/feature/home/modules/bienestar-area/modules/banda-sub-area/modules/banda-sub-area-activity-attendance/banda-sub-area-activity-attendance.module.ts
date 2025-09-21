import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BandaSubAreaActivityAttendanceRoutingModule } from './banda-sub-area-activity-attendance-routing.module';
import { BandaSubAreaActivityAttendanceComponent } from './components/banda-sub-area-activity-attendance.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    BandaSubAreaActivityAttendanceComponent
  ],
  imports: [
    CommonModule,
    BandaSubAreaActivityAttendanceRoutingModule,
    SharedModule
  ]
})
export class BandaSubAreaActivityAttendanceModule { }
