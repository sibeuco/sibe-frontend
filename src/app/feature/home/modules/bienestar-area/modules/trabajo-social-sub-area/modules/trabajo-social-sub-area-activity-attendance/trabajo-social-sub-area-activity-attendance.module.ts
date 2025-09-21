import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrabajoSocialSubAreaActivityAttendanceRoutingModule } from './trabajo-social-sub-area-activity-attendance-routing.module';
import { TrabajoSocialSubAreaActivityAttendanceComponent } from './components/trabajo-social-sub-area-activity-attendance.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TrabajoSocialSubAreaActivityAttendanceComponent
  ],
  imports: [
    CommonModule,
    TrabajoSocialSubAreaActivityAttendanceRoutingModule,
    SharedModule
  ]
})
export class TrabajoSocialSubAreaActivityAttendanceModule { }
