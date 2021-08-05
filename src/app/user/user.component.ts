import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AccountService} from "../services/account.service";
import { User } from "../../../models/User";
import {Router} from "@angular/router";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserComponent implements OnInit {

  private currentUser: User;
  userIsAdmin: boolean;
  searchtext: string;
  users: any;

  constructor(private router: Router,
              private http: HttpClient,
              private accountService: AccountService) {
    this.accountService.user.subscribe(x => {
      this.currentUser = x;
      this.userIsAdmin = (this.currentUser != null && this.currentUser.isAdmin);
      console.log(`Shelf subscription update ${JSON.stringify(this.currentUser)}`);
    });
  }

  ngOnInit(): void {
    this.accountService.getAll().subscribe(data => {
        this.users = data;
    });

  }

  deleteUser(id) {
    //this.http.delete('/user/'+id)
    this.accountService.delete(id)
      .subscribe(res => {
          console.log(`User detail delete user ${id}  ${JSON.stringify(this.accountService.userValue)} `)
          if (this.accountService.userValue != null && id != this.accountService.userValue._id){
            this.accountService.logout();
          }
          else {
            this.router.navigate(['/userlist']);
          }
        }, (err) => {
          console.log(err);
        }
      );
  }

}
