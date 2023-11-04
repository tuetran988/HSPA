import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../model/user';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  addUser(user: User) {
    let users = [];
    const storedUsers = localStorage.getItem('Users');
    if (storedUsers != null) {
      users = JSON.parse(storedUsers);
      users = [...users, user];
    } else {
      users = [user];
    }

    localStorage.setItem('Users', JSON.stringify(users));
  }
}
