import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeportesSubAreaComponent } from './components/deportes-sub-area.component';

const routes: Routes = [{ path: '', component: DeportesSubAreaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeportesSubAreaRoutingModule { }
