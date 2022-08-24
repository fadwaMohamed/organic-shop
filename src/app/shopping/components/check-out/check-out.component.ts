import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Cart } from 'src/app/shared/models/cart';

import { CartService } from './../../../shared/services/cart.service';

@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
})
export class CheckOutComponent implements OnInit {
  cart$!: Observable<Cart | null>;

  sub!: Subscription;

  constructor(private cartSer: CartService) {}

  async ngOnInit() {
    this.cart$ = await this.cartSer.getCart();
  }
}
