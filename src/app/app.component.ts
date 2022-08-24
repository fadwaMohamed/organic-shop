import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'o-shop';

  /* constructor(private auth: AuthService, private router: Router) {
    this.auth.currentUser$.subscribe((user) => {
      if (user) {
        let returnUrl = localStorage.getItem('returnUrl');
        this.router.navigate([`/${returnUrl}`]);
      }
    });
  } */
}
