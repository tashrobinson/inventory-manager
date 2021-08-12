import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { AccountService } from "../services/account.service";
import { User } from "../../../models/User";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedInUser: User;
  username: string;
  gravatarEmail: string;
  userIsAdmin: boolean;
  userID: string;

  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe(x => {
      this.loggedInUser = x;
      this.username = this.loggedInUser != null ? this.loggedInUser.username : "";
      this.userIsAdmin = (this.loggedInUser != null && this.loggedInUser.isAdmin);
      this.gravatarEmail = this.loggedInUser != null ? this.loggedInUser.email : "";
      this.userID = this.loggedInUser != null ? this.loggedInUser._id : "";
      console.log(`Header subscription update ${this.loggedInUser}`);
    });
  }

  ngOnInit(): void {
  }

  logoutClick(){
     console.log("Logout was clicked!")
     this.accountService.logout();
  }

}
