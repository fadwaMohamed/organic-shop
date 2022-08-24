import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cart } from 'src/app/shared/models/cart';

import { CartService } from './../../../shared/services/cart.service';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart!: Cart | null;
  empty: boolean = false;

  displayedColumns: string[] = [
    'image',
    'product',
    'quantity',
    'price',
    'actions',
  ];

  constructor(private cartSer: CartService, private modalService: NgbModal) {}

  async ngOnInit(): Promise<void> {
    // get cart
    let cart$ = await this.cartSer.getCart();
    cart$.subscribe((c) => {
      this.cart = c;
      if (!c) this.empty = true;
    });
  }

  deleteProduct(key: string) {
    this.cartSer.removeFromCart(key);
  }

  async clearCart(modal: any) {
    this.modalService.dismissAll(modal);
    this.empty = true;
    await this.cartSer.clear();
  }

  openDialog(modal: any) {
    this.modalService.open(modal);
  }
}
