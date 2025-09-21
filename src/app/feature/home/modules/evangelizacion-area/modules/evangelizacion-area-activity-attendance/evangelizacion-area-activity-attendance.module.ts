import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvangelizacionAreaActivityAttendanceRoutingModule } from './evangelizacion-area-activity-attendance-routing.module';
import { EvangelizacionAreaActivityAttendanceComponent } from './components/evangelizacion-area-activity-attendance.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    EvangelizacionAreaActivityAttendanceComponent,
  ],
  imports: [
    CommonModule,
    EvangelizacionAreaActivityAttendanceRoutingModule,
    SharedModule
  ]
})
export class EvangelizacionAreaActivityAttendanceModule { }
