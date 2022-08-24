import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { Cart } from 'src/app/shared/models/cart';
import { Iproduct } from 'src/app/shared/models/iproduct';
import { ProductService } from 'src/app/shared/services/product.service';

import { CartService } from './../../../shared/services/cart.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Iproduct[] = [];
  filteredProducts: Iproduct[] = [];
  cart!: Cart | null;

  category!: string;

  sub1!: Subscription;
  sub2!: Subscription;

  constructor(
    private productSer: ProductService,
    private ar: ActivatedRoute,
    private cartSer: CartService
  ) {}

  async ngOnInit(): Promise<void> {
    this.sub1 = (await this.cartSer.getCart()).subscribe(
      (cart) => (this.cart = cart)
    );
    this.populateProducts();
  }

  private populateProducts() {
    // products
    this.sub2 = this.productSer
      .getAll()
      .pipe(
        switchMap((products) => {
          this.products = products;
          // return next observable an the subscrube
          return this.ar.queryParams;
        })
      )
      .subscribe((param) => {
        this.category = param['category'];
        this.applyFilter();
      });
  }

  private applyFilter() {
    this.filteredProducts = this.category
      ? this.products.filter((product) => product.category === this.category)
      : this.products;
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }
}
