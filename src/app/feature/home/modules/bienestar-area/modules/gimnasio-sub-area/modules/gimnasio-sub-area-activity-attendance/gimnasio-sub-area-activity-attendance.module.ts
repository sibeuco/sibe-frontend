import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GimnasioSubAreaActivityAttendanceRoutingModule } from './gimnasio-sub-area-activity-attendance-routing.module';
import { GimnasioSubAreaActivityAttendanceComponent } from './components/gimnasio-sub-area-activity-attendance.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    GimnasioSubAreaActivityAttendanceComponent
  ],
  imports: [
    CommonModule,
    GimnasioSubAreaActivityAttendanceRoutingModule,
    SharedModule
  ]
})
export class GimnasioSubAreaActivityAttendanceModule { }
