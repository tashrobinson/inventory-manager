import { Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../../models/User';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AccountService {

  logoutEvent = new Subject();

  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    //console.log(`User value ${JSON.stringify(this.userSubject.value)}`)
    return this.userSubject.value;
  }

  login(username, password) {
    console.log(`Account service login ${username} ${password}`)

    return this.http.post<User>(`/user/authenticate`, { username, password })
      .pipe(map(user => {
        console.log('Account service authenticated user ' + JSON.stringify(user))
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  getLogoutEvent(){
    return this.logoutEvent.asObservable();
  }

  logout() {
    // remove user from local storage and set current user to null
    console.log("Account service logout")
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.logoutEvent.next();
  }

  register(user: User) {
    return this.http.post(`/user`, user);
  }

  getAll() {
    return this.http.get<User[]>(`/user`);
  }

  getById(id: string) {
    return this.http.get<User>(`/user/${id}`);
  }

  update(id, user) {
    console.log(`Account service update ${id} ${JSON.stringify(user)}`)
    return this.http.put(`/user/${id}`, user)
      .pipe(map(x => {
        // update stored user if the logged in user updated their own record
        console.log(`Account service update this.userValue.id = ${this.userValue._id}`);
        if (id == this.userValue._id) {
          // update local storage
          console.log(`Update current user set local storage ${JSON.stringify(user)}`);
          localStorage.setItem('user', JSON.stringify(user));

          // publish updated user to subscribers
          this.userSubject.next(user);
        }
        return x;
      }));
  }

  delete(id: string) {
    console.log(`Account service delete ${id}`)
    return this.http.delete(`/user/${id}`)
      .pipe(map(x => {
        // auto logout if the logged in user deleted their own record
        console.log(`Account service delete this.userValue.id = ${this.userValue._id}`);
        if (id == this.userValue._id) {
          console.log('Account service delete calling logout');
          this.logout();
        }
        return x;
      }));
  }
}
