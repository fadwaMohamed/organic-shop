import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable, of, switchMap } from 'rxjs';

import { IUser } from '../models/iuser';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser$: Observable<firebase.User | null>;

  constructor(
    private fAuth: AngularFireAuth,
    private ar: ActivatedRoute,
    private router: Router,
    private userSer: UserService
  ) {
    this.currentUser$ = this.fAuth.user;
  }

  login() {
    let returnUrl = this.ar.snapshot.queryParamMap.get('returnUrl') || '/';
    //localStorage.setItem('returnUrl', returnUrl);

    this.fAuth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(() => {
        this.currentUser$.subscribe((user) => {
          if (!user) return;

          this.userSer.save(user);

          /* let returnUrl = localStorage.getItem('returnUrl');
          if (!returnUrl) return;
          localStorage.removeItem('returnUrl'); */

          this.router.navigate([`/${returnUrl}`]);
        });
      });
  }

  logout() {
    this.fAuth.signOut();
  }

  get userApp$(): Observable<IUser | null> {
    return this.currentUser$.pipe(
      switchMap((user) => {
        if (user) return this.userSer.getUser(user.uid);
        // of > return observable
        return of(null);
      })
    );
  }

  /* isLoggedIn(): boolean {
    return this.currentUser$ ? true : false;
  }

  userName() {
    return this.currentUser$.subscribe((user) => user?.displayName);
  } */
}
