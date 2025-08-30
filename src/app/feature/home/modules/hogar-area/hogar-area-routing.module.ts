import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HogarAreaComponent } from './components/hogar-area.component';

const routes: Routes = [{ path: '', component: HogarAreaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HogarAreaRoutingModule { }
