import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IUser } from './../../../shared/models/iuser';
import { AuthService } from './../../../shared/services/auth.service';
import { CartService } from './../../../shared/services/cart.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isMenuCollapsed = true;
  user!: IUser | null;

  totalCount: number = 0;

  constructor(
    private auth: AuthService,
    private router: Router,
    private cartSer: CartService
  ) {}

  async ngOnInit(): Promise<void> {
    this.auth.userApp$.subscribe((user) => (this.user = user));

    let cart$ = await this.cartSer.getCart();
    // no need to unsubscribe > nav created only once
    cart$.subscribe((cart) => {
      if (cart) this.totalCount = cart.totalItemsCount;
      else this.totalCount = 0;
    });
  }

  isAdmin(): boolean {
    return true;
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  /* isUser(): boolean {
    return this.authSer.isLoggedIn();
  }

  userName(): string {
    return this.authSer.userName();
  } */
}
