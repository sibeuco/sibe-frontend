import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnidadSubAreaActivityAttendanceComponent } from './components/unidad-sub-area-activity-attendance.component';

const routes: Routes = [{ path: '', component: UnidadSubAreaActivityAttendanceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnidadSubAreaActivityAttendanceRoutingModule { }
