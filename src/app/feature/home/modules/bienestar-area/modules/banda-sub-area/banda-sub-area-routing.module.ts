import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BandaSubAreaComponent } from './components/banda-sub-area.component';

const routes: Routes = [{ path: '', component: BandaSubAreaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BandaSubAreaRoutingModule { }
