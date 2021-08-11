import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserRegister} from "../models/user-register";
import {AccountService} from "../services/account.service";
import { User } from "../../../models/User";
import { Md5 } from "ts-md5";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserCreateComponent implements OnInit{

  private currentUser: User;
  userIsAdmin: boolean;
  duplicateUser: boolean;
  duplicateEmail: boolean;

  userModel = new UserRegister();
  user: any = {};
  emailPattern = "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$";



  constructor(private http: HttpClient, private router: Router,
              private accountService: AccountService) {
    this.accountService.user.subscribe(x => {
      this.currentUser = x;
      this.userIsAdmin = this.currentUser.isAdmin;
      console.log(`User create subscription update ${JSON.stringify(this.currentUser)}`);
    });
  }

  ngOnInit(): void {
  }

  saveUser() {

    this.duplicateUser = false;
    this.duplicateEmail = false;

    if(this.userModel.password === this.userModel.confirmPassword){
      this.user.username = this.userModel.username;
      this.user.email = this.userModel.email;
      if (this.userModel.isAdmin){
        this.user.isAdmin = true;
      } //kludge to be false if its unset
      else {
        this.user.isAdmin = false
      };
      this.user.passwordHash = Md5.hashStr(this.userModel.password.trim().toLowerCase());
    }

    this.accountService.register(this.user)
      .subscribe(res => {
          //console.log(`user-create register ${JSON.stringify(res)}`);
          const id = res['_id'];
          this.router.navigate(['/user-details', id]);
        },
        (err) => {
          //console.log(`user-create error ${JSON.stringify(err)}`);
          const theError = err.error.error;
          if (theError.code === 11000) //duplicate key error
          {
            const errorField = theError.keyPattern;

            for (let key in errorField) {
              //if the item has the key property
              if (errorField.hasOwnProperty(key)){
                //console.log(`user-create error field ${key}`)
                if (key === "username"){
                  this.duplicateUser = true;
                }
                if (key === "email"){
                  this.duplicateEmail = true;
                }
              }
            }
          }
        }
      );
  }

}
