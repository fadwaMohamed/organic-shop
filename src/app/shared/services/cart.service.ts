import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { map, Observable, take } from 'rxjs';
import { Iproduct } from 'src/app/shared/models/iproduct';

import { Cart } from './../models/cart';
import { CartItem } from './../models/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  listRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    this.listRef = this.db.list<Cart>(`cart`);
  }

  async getCart(): Promise<Observable<Cart | null>> {
    let cartId = await this.getOrCreateCartId();
    return this.db
      .object<Cart>(`cart/${cartId}`)
      .valueChanges()
      .pipe(
        map((c) => {
          return c ? new Cart(c.items) : null;
        })
      );
  }

  async removeFromCart(key: string) {
    let cartId = await this.getOrCreateCartId();
    this.getItem(cartId, JSON.stringify(key)).remove();
  }

  async clear() {
    let cartId = await this.getOrCreateCartId();
    this.listRef.remove(cartId);
  }

  async addOrUpdate(isIncrease: boolean, product: Iproduct) {
    // check if cart exist
    let cartId = await this.getOrCreateCartId();
    // get observable of nested object in the selected cart
    let item$ = this.getItem(cartId, JSON.stringify(product.key));

    item$
      .valueChanges()
      .pipe(take(1))
      .subscribe((p) => {
        // remove product
        if (!isIncrease && p?.quantity == 1) item$.remove();
        // add or update quantity
        else {
          item$.update({
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: (p?.quantity || 0) + (isIncrease ? +1 : -1),
          });
        }
      });
  }

  private getItem(cartId: string, key: string) {
    return this.db.object<CartItem>(`cart/${cartId}/items/${key}`);
  }

  private create() {
    return this.listRef.push({
      createdDate: new Date().getTime(),
    });
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    // create cart
    let result = await this.create();

    // store cart key in local storage
    localStorage.setItem('cartId', JSON.stringify(result.key));
    return JSON.stringify(result.key);
  }
}
