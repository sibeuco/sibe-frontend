import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExtensionSubAreaActivityAttendanceRoutingModule } from './extension-sub-area-activity-attendance-routing.module';
import { ExtensionSubAreaActivityAttendanceComponent } from './components/extension-sub-area-activity-attendance.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ExtensionSubAreaActivityAttendanceComponent
  ],
  imports: [
    CommonModule,
    ExtensionSubAreaActivityAttendanceRoutingModule,
    SharedModule
  ]
})
export class ExtensionSubAreaActivityAttendanceModule { }
