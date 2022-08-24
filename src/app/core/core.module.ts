import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { LogInComponent } from './components/log-in/log-in.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    NavbarComponent,
    LogInComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([]),
  ],
  exports: [
    NavbarComponent
  ]
})
export class CoreModule { }
