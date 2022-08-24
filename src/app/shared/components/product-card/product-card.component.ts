import { Component, Input, OnInit } from '@angular/core';
import { Iproduct } from 'src/app/shared/models/iproduct';

import { CartService } from '../../services/cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input('product') product!: Iproduct;
  @Input('showActions') showActions: boolean = true;
  @Input('onlyQuantity') onlyQuantity: boolean = false;
  @Input('quantity') quantity: number = 0;

  constructor(private cartSer: CartService) {}

  changeQuantity(isIncrease: boolean) {
    // change quantity
    isIncrease ? this.quantity++ : this.quantity--;

    // edit quantity | add product | remove
    this.cartSer.addOrUpdate(isIncrease, this.product);
  }

  ngOnInit(): void {}
}
