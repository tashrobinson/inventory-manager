import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { Router} from "@angular/router";
import { UserRegister} from "../models/user-register";
import { Md5 } from "ts-md5";
import { NgForm } from '@angular/forms';

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
  isValidFormSubmitted = false;
  emailPattern = "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$";

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
  }

  cancelRegister(){
    this.completeEvent.emit();
  }

  saveUser(form: NgForm) {

    this.isValidFormSubmitted = false;
    if (form.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;

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
        this.user.passwordHash = Md5.hashStr(this.userModel.password.trim().toLowerCase());
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
