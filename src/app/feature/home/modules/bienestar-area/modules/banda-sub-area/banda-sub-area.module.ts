import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BandaSubAreaRoutingModule } from './banda-sub-area-routing.module';
import { BandaSubAreaComponent } from './components/banda-sub-area.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivitiesComponent } from './components/activities/activities.component';
import { FiltersComponent } from './components/filters/filters.component';
import { TopDataComponent } from './components/top-data/top-data.component';
import { BottomDataComponent } from './components/bottom-data/bottom-data.component';


@NgModule({
  declarations: [
    BandaSubAreaComponent,
    ActivitiesComponent,
    FiltersComponent,
    TopDataComponent,
    BottomDataComponent
  ],
  imports: [
    CommonModule,
    BandaSubAreaRoutingModule,
    SharedModule
  ]
})
export class BandaSubAreaModule { }
