import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CanchaSubAreaRoutingModule } from './cancha-sub-area-routing.module';
import { CanchaSubAreaComponent } from './cancha-sub-area.component';


@NgModule({
  declarations: [
    CanchaSubAreaComponent
  ],
  imports: [
    CommonModule,
    CanchaSubAreaRoutingModule
  ]
})
export class CanchaSubAreaModule { }
