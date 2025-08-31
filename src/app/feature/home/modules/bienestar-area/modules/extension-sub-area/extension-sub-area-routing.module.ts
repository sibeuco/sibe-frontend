import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExtensionSubAreaComponent } from './components/extension-sub-area.component';

const routes: Routes = [{ path: '', component: ExtensionSubAreaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtensionSubAreaRoutingModule { }
