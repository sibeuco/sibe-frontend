import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeportesSubAreaRoutingModule } from './deportes-sub-area-routing.module';
import { DeportesSubAreaComponent } from './components/deportes-sub-area.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivitiesComponent } from './components/activities/activities.component';
import { FiltersComponent } from './components/filters/filters.component';
import { TopDataComponent } from './components/top-data/top-data.component';
import { BottomDataComponent } from './components/bottom-data/bottom-data.component';


@NgModule({
  declarations: [
    DeportesSubAreaComponent,
    ActivitiesComponent,
    FiltersComponent,
    TopDataComponent,
    BottomDataComponent
  ],
  imports: [
    CommonModule,
    DeportesSubAreaRoutingModule,
    SharedModule
  ]
})
export class DeportesSubAreaModule { }
