import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcompanamientoSubAreaActivityAttendanceRoutingModule } from './acompanamiento-sub-area-activity-attendance-routing.module';
import { AcompanamientoSubAreaActivityAttendanceComponent } from './components/acompanamiento-sub-area-activity-attendance.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AcompanamientoSubAreaActivityAttendanceComponent
  ],
  imports: [
    CommonModule,
    AcompanamientoSubAreaActivityAttendanceRoutingModule,
    SharedModule
  ]
})
export class AcompanamientoSubAreaActivityAttendanceModule { }
