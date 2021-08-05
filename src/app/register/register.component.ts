import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { Router} from "@angular/router";
import { UserRegister} from "../models/user-register";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output()
  completeEvent = new EventEmitter();

  userModel = new UserRegister();
  adminCount: number;
  user: any = {};

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
  }

  cancelRegister(){
    this.completeEvent.emit();
  }

  getHash(password) {
    let hash = 0;
    if (password == null || password.length == 0) {
      return hash;
    }
    for (let i = 0; i < password.length; i++) {
      let char = password.charCodeAt(i);
      hash = ((hash<<5)-hash)+char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString();
  }

  saveUser() {

    this.http.get('/user/admincount').subscribe(data => {
      this.adminCount = parseInt(JSON.stringify(data));
      if(this.userModel.password === this.userModel.confirmPassword){
        this.user.username = this.userModel.username;
        this.user.email = this.userModel.email;
        console.log("Save user user.count " + this.adminCount )
        if (this.userModel.isAdmin || this.adminCount === 0){ //if no users yet make the first one admin!
          this.user.isAdmin = true;
        } //kludge to be false if its unset
        else {
          this.user.isAdmin = false
        };
        this.user.passwordHash = this.getHash(this.userModel.password);
      }

      this.http.post('/user', this.user)
        .subscribe(res => {
            this.completeEvent.emit();
          },
          (err) => {
            console.log(err);
          }
        );
    });


  }

}
