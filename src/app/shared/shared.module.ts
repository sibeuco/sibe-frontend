import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateService } from './service/state.service';
import { GoToAreaButtonComponent } from './components/go-to-area-button/go-to-area-button.component';
import { RouterModule } from '@angular/router';
import { SeparatorComponent } from './components/separator/separator.component';
import { PrimaryButtonComponent } from './components/primary-button/primary-button.component';

@NgModule({
  declarations: [
    GoToAreaButtonComponent,
    SeparatorComponent,
    PrimaryButtonComponent
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
    RouterModule
  ]
})
export class SharedModule { }
