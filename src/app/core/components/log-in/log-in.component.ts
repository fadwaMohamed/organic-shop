import { Component, OnInit } from '@angular/core';

import { AuthService } from './../../../shared/services/auth.service';

@Component({
  selector: 'log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  constructor(private authSer: AuthService) {}

  ngOnInit(): void {}

  login() {
    this.authSer.login();
  }
}
