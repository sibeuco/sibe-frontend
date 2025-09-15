import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CanchaSubAreaRoutingModule } from './cancha-sub-area-routing.module';
import { CanchaSubAreaComponent } from './components/cancha-sub-area.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivitiesComponent } from './components/activities/activities.component';
import { FiltersComponent } from './components/filters/filters.component';
import { TopDataComponent } from './components/top-data/top-data.component';
import { BottomDataComponent } from './components/bottom-data/bottom-data.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CanchaSubAreaComponent,
    ActivitiesComponent,
    FiltersComponent,
    TopDataComponent,
    BottomDataComponent
  ],
  imports: [
    CommonModule,
    CanchaSubAreaRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class CanchaSubAreaModule { }
