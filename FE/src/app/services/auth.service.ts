import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  authUser(user:any){
    let UserArray = [];
    const tmp = localStorage.getItem('Users')
    if(tmp!=null){
      UserArray = JSON.parse(tmp);
    }
    return UserArray.find((p:any)=> p.userName == user.userName && p.password == user.password);
  }
}
