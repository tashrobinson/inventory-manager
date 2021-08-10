import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {AccountService} from "../services/account.service";
import { User } from "../../../models/User";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  private currentUser: User;
  userIsAdmin: boolean;
  popoverTitle = 'Are you sure?';
  popoverMessage = 'Are you really <b>sure</b> you want to do this?';
  user: any = {};

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient,
              private accountService: AccountService) {
    this.accountService.user.subscribe(x => {
      this.currentUser = x;
      this.userIsAdmin = (this.currentUser != null && this.currentUser.isAdmin);
      console.log(`User detail subscription update ${JSON.stringify(this.currentUser)}}`);
    });
  }

  ngOnInit() {
    if (this.router.url.includes("delete")){
      this.deleteUser(this.route.snapshot.params['id']);
    }
    else {
      this.getUserDetail(this.route.snapshot.params['id']);
    }
  }

  checkCurrentUser(id){
    return id === this.currentUser._id;
  }

  getUserDetail(id) {
    this.accountService.getById(id).subscribe(data => {
        this.user = data;
    });
  }

  deleteUser(id) {
    this.accountService.delete(id)
      .subscribe(res => {
          console.log(`User detail delete user ${id}  ${JSON.stringify(this.accountService.userValue)} `)
          if (this.accountService.userValue == null || id == this.accountService.userValue._id){
            console.log('User detail delete calling logout')
            this.accountService.logout();
          }
          else {
            console.log('User detail delete redirect to userlist')
            this.router.navigate(['/userlist']);
          }
        }, (err) => {
          console.log(err);
        }
      );
  }

  cancel(){}
}
