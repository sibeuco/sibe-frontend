import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateService } from './service/state.service';
import { GoToAreaButtonComponent } from './components/go-to-area-button/go-to-area-button.component';
import { RouterModule } from '@angular/router';
import { SeparatorComponent } from './components/separator/separator.component';
import { PrimaryButtonComponent } from './components/primary-button/primary-button.component';
import { AreaTopImageComponent } from './components/area-top-image/area-top-image.component';
import { AreaButtonsComponent } from './components/area-buttons/area-buttons.component';

@NgModule({
  declarations: [
    GoToAreaButtonComponent,
    SeparatorComponent,
    PrimaryButtonComponent,
    AreaTopImageComponent,
    AreaButtonsComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers:[
    StateService
  ],
  exports: [
    GoToAreaButtonComponent,
    SeparatorComponent,
    PrimaryButtonComponent,
    RouterModule,
    AreaTopImageComponent,
    AreaButtonsComponent
  ]
})
export class SharedModule { }
