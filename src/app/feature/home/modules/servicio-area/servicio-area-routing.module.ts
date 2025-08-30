import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicioAreaComponent } from './components/servicio-area.component';

const routes: Routes = [{ path: '', component: ServicioAreaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicioAreaRoutingModule { }
