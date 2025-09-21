import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExtensionSubAreaActivityAttendanceComponent } from './components/extension-sub-area-activity-attendance.component';

const routes: Routes = [{ path: '', component: ExtensionSubAreaActivityAttendanceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtensionSubAreaActivityAttendanceRoutingModule { }
