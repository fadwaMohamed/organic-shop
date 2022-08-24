import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MatComponentsModule } from './../mat-components.module';
import { OrderViewComponent } from './components/order-view/order-view.component';
import { ProductCardComponent } from './components/product-card/product-card.component';

@NgModule({
  declarations: [
    ProductCardComponent,
    OrderViewComponent
  ],
  imports: [
    CommonModule,
    MatComponentsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  exports: [
    ProductCardComponent,
    OrderViewComponent,
    CommonModule,
    MatComponentsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class SharedModule { }
