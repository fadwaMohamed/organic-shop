import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../shared/services/auth-guard.guard';
import { SharedModule } from '../shared/shared.module';
import { OrderViewComponent } from './../shared/components/order-view/order-view.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductsComponent } from './components/products/products.component';
import { AuthAdminGuard } from './services/auth-admin.guard';

const routes: Routes = [
  {
    path: 'orders/:id',
    component: OrderViewComponent,
    canActivate: [AuthGuard, AuthAdminGuard],
  },
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [AuthGuard, AuthAdminGuard],
  },
  {
    path: 'products/new',
    component: ProductFormComponent,
    canActivate: [AuthGuard, AuthAdminGuard],
  },
  {
    path: 'products/update/:key',
    component: ProductFormComponent,
    canActivate: [AuthGuard, AuthAdminGuard],
  },
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [AuthGuard, AuthAdminGuard],
  }
];

@NgModule({
  declarations: [
    OrdersComponent,
    ProductsComponent,
    ProductFormComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
})
export class AdminModule {}
