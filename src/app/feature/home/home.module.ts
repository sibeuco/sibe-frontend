import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home.component';
import { PrincipalHomeComponent } from './components/principal-home/principal-home.component';
import { HomePrimaryButtonsComponent } from './components/home-primary-buttons/home-primary-buttons.component';
import { AreasComponent } from './components/areas/areas.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeFiltersComponent } from './components/home-filters/home-filters.component';


@NgModule({
  declarations: [
    HomeComponent,
    PrincipalHomeComponent,
    HomePrimaryButtonsComponent,
    AreasComponent,
    HomeFiltersComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
