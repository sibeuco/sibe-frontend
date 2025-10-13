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
import { FilterListComponent } from './components/filter-list/filter-list.component';
import { EditActivityComponent } from './components/edit-activity/edit-activity.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { UploadDatabaseComponent } from './components/upload-database/upload-database.component';
import { ExternalParticipantComponent } from './components/external-participant/external-participant.component';

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
    ActivitiesTableComponent,
    FilterListComponent,
    EditActivityComponent,
    ChangePasswordComponent,
    UploadDatabaseComponent,
    ExternalParticipantComponent
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
    AreaTopImageComponent,
    AreaButtonsComponent,
    RegisterNewActivityComponent,
    ActivityInfoComponent,
    AttendanceRecordComponent,
    ActivitiesTableComponent,
    FilterListComponent,
    ChangePasswordComponent,
    UploadDatabaseComponent,
    ExternalParticipantComponent
  ]
})
export class SharedModule { }
