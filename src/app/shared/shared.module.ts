import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateService } from './service/state.service';
import { GoToAreaButtonComponent } from './components/go-to-area-button/go-to-area-button.component';
import { RouterModule } from '@angular/router';
import { SeparatorComponent } from './components/separator/separator.component';
import { PrimaryButtonComponent } from './components/primary-button/primary-button.component';
import { AreaTopImageComponent } from './components/area-top-image/area-top-image.component';
import { AreaButtonsComponent } from './components/area-buttons/area-buttons.component';
import { RegisterNewActivityComponent } from './components/register-new-activity/register-new-activity.component';
import { FormsModule } from '@angular/forms';
import { ActivityInfoComponent } from './components/activity-info/activity-info.component';
import { AttendanceRecordComponent } from './components/attendance-record/attendance-record.component';
import { ActivitiesTableComponent } from './components/activities-table/activities-table.component';

@NgModule({
  declarations: [
    GoToAreaButtonComponent,
    SeparatorComponent,
    PrimaryButtonComponent,
    AreaTopImageComponent,
    AreaButtonsComponent,
    RegisterNewActivityComponent,
    ActivityInfoComponent,
    AttendanceRecordComponent,
    ActivitiesTableComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  providers:[
    StateService
  ],
  exports: [
    GoToAreaButtonComponent,
    SeparatorComponent,
    PrimaryButtonComponent,
    RouterModule,
    AreaTopImageComponent,
    AreaButtonsComponent,
    RegisterNewActivityComponent,
    ActivityInfoComponent,
    AttendanceRecordComponent,
    ActivitiesTableComponent
  ]
})
export class SharedModule { }
