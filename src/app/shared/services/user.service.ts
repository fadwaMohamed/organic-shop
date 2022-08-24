import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';

import { IUser } from '../models/iuser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFireDatabase) {}

  save(user: firebase.User) {
    this.db.object(`users/${user.uid}`).update({
      name: user.displayName,
      email: user.email,
    });
  }

  getUser(uid: string): Observable<IUser | null> {
    // valueChanges > convert AngularFireObject into observable
    return this.db.object<IUser>(`users/${uid}`).valueChanges();
  }
}
