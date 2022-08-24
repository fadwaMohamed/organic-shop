import { Component, Input } from '@angular/core';
import { Cart } from 'src/app/shared/models/cart';

import { CartService } from './../../../shared/services/cart.service';

@Component({
  selector: 'cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css'],
})
export class CartSummaryComponent {
  @Input('cart') cart!: Cart;

  constructor(private cartSer: CartService) {}
}
