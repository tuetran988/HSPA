import { AlertifyService } from './../services/alertify.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  loggedInUser: string | null = '';

  constructor(private alertify: AlertifyService){}



  loggedin() {
    this.loggedInUser =  localStorage.getItem('token');
    return this.loggedInUser;
  }
  onLogout() {
    const tmp = localStorage.getItem('token');
    if (tmp) {
      localStorage.removeItem('token');
      this.alertify.success('logout success');
    }
  }
}
