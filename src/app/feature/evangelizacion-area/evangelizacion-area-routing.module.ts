import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvangelizacionAreaComponent } from './components/evangelizacion-area.component';

const routes: Routes = [{ path: '', component: EvangelizacionAreaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvangelizacionAreaRoutingModule { }
