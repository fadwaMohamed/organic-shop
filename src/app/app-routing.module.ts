import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminModule } from './admin/admin.module';
import { LogInComponent } from './core/components/log-in/log-in.component';
import { NotFoundComponent } from './core/components/notFound/notFound.component';
import { ProductsComponent } from './shopping/components/products/products.component';
import { ShoppingModule } from './shopping/shopping.module';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'login', component: LogInComponent },
  { path: 'admin', loadChildren: () => AdminModule },
  { path: 'shopping', loadChildren: () => ShoppingModule },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
