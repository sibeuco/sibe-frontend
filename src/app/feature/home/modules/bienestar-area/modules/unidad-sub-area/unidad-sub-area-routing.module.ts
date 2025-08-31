import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnidadSubAreaComponent } from './components/unidad-sub-area.component';

const routes: Routes = [{ path: '', component: UnidadSubAreaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnidadSubAreaRoutingModule { }
