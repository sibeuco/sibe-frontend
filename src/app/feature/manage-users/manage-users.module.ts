import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ManageUsersRoutingModule } from './manage-users-routing.module';
import { ManageUsersComponent } from './components/manage-users.component';
import { DepartmentUsersComponent } from './components/department-users/department-users.component';
import { AreaUsersComponent } from './components/area-users/area-users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegisterNewUserComponent } from './components/register-new-user/register-new-user.component';


@NgModule({
  declarations: [
    ManageUsersComponent,
    DepartmentUsersComponent,
    AreaUsersComponent,
    RegisterNewUserComponent
  ],
  imports: [
    CommonModule,
    ManageUsersRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class ManageUsersModule { }
