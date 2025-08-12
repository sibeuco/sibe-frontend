import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HogarAreaRoutingModule } from './hogar-area-routing.module';
import { HogarAreaComponent } from './components/hogar-area.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivitiesComponent } from './components/activities/activities.component';
import { AreaFiltersComponent } from './components/area-filters/area-filters.component';
import { TopDataContainerComponent } from './components/top-data-container/top-data-container.component';
import { BottomDataContainerComponent } from './components/bottom-data-container/bottom-data-container.component';


@NgModule({
  declarations: [
    HogarAreaComponent,
    ActivitiesComponent,
    AreaFiltersComponent,
    TopDataContainerComponent,
    BottomDataContainerComponent
  ],
  imports: [
    CommonModule,
    HogarAreaRoutingModule,
    SharedModule
  ]
})
export class HogarAreaModule { }
