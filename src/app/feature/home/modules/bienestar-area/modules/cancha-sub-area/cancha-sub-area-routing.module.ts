import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanchaSubAreaComponent } from './components/cancha-sub-area.component';

const routes: Routes = [{ path: '', component: CanchaSubAreaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CanchaSubAreaRoutingModule { }
