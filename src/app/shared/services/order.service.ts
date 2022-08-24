import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { map } from 'rxjs';

import { Order } from './../models/order';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  listRef: AngularFireList<Order>;

  constructor(private db: AngularFireDatabase, private cartSer: CartService) {
    this.listRef = db.list<Order>('orders');
  }

  getOrders() {
    return this.listRef.snapshotChanges().pipe(
      map((orders) => {
        if (orders) {
          return orders.map((c) => ({
            key: c.payload.key,
            ...c.payload.val(),
          }));
        }
        return [];
      }),
      map((p) => p as unknown as Order[])
    );
  }

  getOrderById(key: string) {
    return this.db.object<Order>(`orders/${key}`).valueChanges();
  }

  getOrdersByUser(userId: string) {
    return this.db
      .list<Order>('orders', (ref) =>
        ref.orderByChild('userId').equalTo(userId.slice(1, -1))
      )
      .snapshotChanges()
      .pipe(
        map((orders) => {
          if (orders) {
            return orders.map((c) => ({
              key: c.payload.key,
              ...c.payload.val(),
            }));
          }
          return [];
        }),
        map((p) => p as unknown as Order[])
      );
  }

  async addOrder(order: Order) {
    let result = await this.listRef.push(order);
    this.cartSer.clear();
    return result;
  }
}
