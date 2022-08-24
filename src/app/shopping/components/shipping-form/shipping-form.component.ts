import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/shared/models/order';

import { Cart } from './../../../shared/models/cart';
import { Shipping } from '../../../shared/models/shipping-orderItem';
import { AuthService } from './../../../shared/services/auth.service';
import { OrderService } from './../../../shared/services/order.service';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css'],
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  userId!: string;
  @Input('cart') cart!: Cart;

  sub!: Subscription;

  constructor(
    private fb: FormBuilder,
    private orderSer: OrderService,
    private auth: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      address1: ['', [Validators.required]],
      address2: [''],
      city: ['', Validators.required],
    });

    // get user
    this.sub = this.auth.currentUser$.subscribe(
      (user) => (this.userId = user!.uid)
    );
  }

  async placeOrder() {
    let order = await this.orderSer.addOrder(
      new Order(this.userId, this.form.value as Shipping, this.cart)
    );
    this.router.navigate(['/shopping/orderSuccess', order.key]);
  }

  get formCtls() {
    return this.form.controls;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
