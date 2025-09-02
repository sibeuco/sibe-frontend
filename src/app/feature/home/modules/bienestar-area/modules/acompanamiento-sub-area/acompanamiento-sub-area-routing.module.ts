import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcompanamientoSubAreaComponent } from './components/acompanamiento-sub-area.component';

const routes: Routes = [{ path: '', component: AcompanamientoSubAreaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcompanamientoSubAreaRoutingModule { }
