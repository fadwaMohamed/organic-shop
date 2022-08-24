import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../shared/services/auth-guard.guard';
import { SharedModule } from '../shared/shared.module';
import { OrderViewComponent } from './../shared/components/order-view/order-view.component';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ProductFilterComponent } from './components/products/product-filter/product-filter.component';
import { ProductsComponent } from './components/products/products.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';

const routes: Routes = [
  { path: 'cart', component: CartComponent },
  /*  { path: 'products', component: ProductsComponent }, */

  { path: 'myorders/:id', component: OrderViewComponent, canActivate: [AuthGuard] },
  { path: 'myorders', component: MyOrdersComponent, canActivate: [AuthGuard] },
  { path: 'checkOut', component: CheckOutComponent, canActivate: [AuthGuard] },
  {
    path: 'orderSuccess/:orderId',
    component: OrderSuccessComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    CartComponent,
    MyOrdersComponent,
    ProductsComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    ProductFilterComponent,
    ShippingFormComponent,
    CartSummaryComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
})
export class ShoppingModule {}
