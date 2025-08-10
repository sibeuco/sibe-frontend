import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienestarAreaComponent } from './components/bienestar-area.component';

const routes: Routes = [{ path: '', component: BienestarAreaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BienestarAreaRoutingModule { }
