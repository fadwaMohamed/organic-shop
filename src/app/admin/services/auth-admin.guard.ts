import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { combineLatest, map, Observable } from 'rxjs';

import { AuthService } from '../../shared/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthAdminGuard implements CanActivate {
  constructor(
    protected router: Router,
    protected authService: AuthService,
    private authSer: AuthService
  ) {}

  canActivate(): Observable<boolean> {
    return combineLatest([this.authSer.userApp$]).pipe(
      map(([IUser]) => {
        if (IUser?.isAdmin) return IUser.isAdmin;

        this.router.navigate(['/']);
        return false;
      })
    );
  }
}
