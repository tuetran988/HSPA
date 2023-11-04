import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  loggedin() {
    return localStorage.getItem('token');
  }
  onLogout() {
    const tmp = localStorage.getItem('token');
    if (tmp) {
      localStorage.removeItem('token');
    }
  }
}
