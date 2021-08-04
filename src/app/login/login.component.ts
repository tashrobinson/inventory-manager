import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserLogin} from "../models/user-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output()
  loginEvent = new EventEmitter<string>();
  @Output()
  registerEvent = new EventEmitter();

  userLogin = new UserLogin();
  user: any = {};

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  login() {
    this.http.get('/user/username/' + this.userLogin.username).subscribe(data => {
      this.user = data;

      if (this.user.passwordHash == this.getHash(this.userLogin.password)) {
          console.log(JSON.stringify(this.user));
          this.loginEvent.emit(JSON.stringify(this.user));
      }
    });
  }

  register() {
    console.log("register emit!")
    this.registerEvent.emit();
  }

  getHash(password) {
    let hash = 0;
    if (password.length == 0) {
      return hash;
    }
    for (let i = 0; i < password.length; i++) {
      let char = password.charCodeAt(i);
      hash = ((hash<<5)-hash)+char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString();
  }

}
