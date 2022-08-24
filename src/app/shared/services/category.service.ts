import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private db: AngularFireDatabase) {}

  getAll(): Observable<any[]> {
    return this.db
      .list<any>('/categories', (ref) => ref.orderByChild('name'))
      // snapshotChanges return key with values // but // valueChanges return values only
      .snapshotChanges()
      /* .pipe(
        map((categories) => {
          if (categories) {
            return categories.map((c) => ({
              key: c.key,
              ...c.payload.val(),
            }));
          }
          return [];
        })
      ); */
  }
}
