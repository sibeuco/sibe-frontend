import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageDepartmentRoutingModule } from './manage-department-routing.module';
import { ManageDepartmentComponent } from './components/manage-department.component';
import { DepartmentComponent } from './components/department/department.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ManageDepartmentComponent,
    DepartmentComponent
  ],
  imports: [
    CommonModule,
    ManageDepartmentRoutingModule,
    SharedModule
  ]
})
export class ManageDepartmentModule { }
