import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnidadSubAreaActivityAttendanceRoutingModule } from './unidad-sub-area-activity-attendance-routing.module';
import { UnidadSubAreaActivityAttendanceComponent } from './components/unidad-sub-area-activity-attendance.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    UnidadSubAreaActivityAttendanceComponent
  ],
  imports: [
    CommonModule,
    UnidadSubAreaActivityAttendanceRoutingModule,
    SharedModule
  ]
})
export class UnidadSubAreaActivityAttendanceModule { }
