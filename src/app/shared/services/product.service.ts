import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';

import { Iproduct } from './../models/iproduct';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  listRef: AngularFireList<Iproduct>;

  constructor(private db: AngularFireDatabase) {
    this.listRef = this.db.list<Iproduct>(`products`);
  }

  getAll(): Observable<Iproduct[]> {
    return this.listRef.snapshotChanges().pipe(
      map((products) => {
        if (products) {
          return products.map((c) => ({
            key: c.payload.key,
            ...c.payload.val(),
          }));
        }
        return [];
      }),
      map((p) => p as Iproduct[])
    );
  }

  getById(id: string): Observable<Iproduct | null> {
    // return product without its key
    return this.db.object<Iproduct>(`products/${id}`).valueChanges();
  }

  async add(newProduct: Iproduct) {
    return this.listRef
      .push(newProduct)
      .then(() => true)
      .catch(() => false);
  }

  update(key: string, product: Iproduct) {
    this.db.object(`products/${key}`).update(product);
  }

  delete(id: string) {
    this.listRef.remove(id);
  }
}
