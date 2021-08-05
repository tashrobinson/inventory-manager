import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserRegister } from "../models/user-register";
import {AccountService} from "../services/account.service";
import { User } from "../../../models/User";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserEditComponent implements OnInit {

  private currentUser: User;
  userIsAdmin: boolean;

  userModel = new UserRegister();
  user: any = {};

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute,
              private accountService: AccountService) {
    this.accountService.user.subscribe(x => {
      this.currentUser = x;
      this.userIsAdmin = (this.currentUser != null && this.currentUser.isAdmin);
      console.log(`User edit subscription update ${JSON.stringify(this.currentUser)}`);
    });
  }

  ngOnInit() {
    this.getUser(this.route.snapshot.params['id']);
  }

  getUser(id) {
    //this.http.get('/user/'+id).subscribe(data => {
    this.accountService.getById(id).subscribe(data => {
      this.user = data;
      this.userModel.username = this.user.username;
      this.userModel.email = this.user.email;
      this.userModel.isAdmin = this.user.isAdmin;
      this.userModel.oldHash = this.user.passwordHash;
    });
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

  updateUser(id) {

    if(this.userModel.password === this.userModel.confirmPassword){
      this.user.username = this.userModel.username;
      this.user.email = this.userModel.email;
      if (this.userModel.isAdmin){
        this.user.isAdmin = true;
      } //kludge to be false if its unset
      else {
        this.user.isAdmin = false
      };
      this.user.passwordHash = this.getHash(this.userModel.password);
    }

    //this.http.put('/user/'+id, this.user)
    console.log(`User edit - updating ${id} ${JSON.stringify(this.user)}`)
    this.accountService.update(id, this.user)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/user-details', id]);
        }, (err) => {
          console.log(err);
        }
      );
  }

}
