import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-logout',
  template: '',
  styles: [],
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    localStorage.removeItem('auth_app_token');
    this.router.navigate(['auth/login']);
  }

}
