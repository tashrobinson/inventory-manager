import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {AccountService} from "../services/account.service";
import { User } from "../../../models/User";

@Component({
  selector: 'app-shelf-create',
  templateUrl: './shelf-create.component.html',
  styleUrls: ['./shelf-create.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ShelfCreateComponent implements OnInit {

  private user: User;
  userIsAdmin: boolean;
  products: any;
  shelf: any = {};

  constructor(private http: HttpClient, private router: Router, private accountService: AccountService) {
    this.accountService.user.subscribe(x => {
      this.user = x;
      this.userIsAdmin = (this.user != null && this.user.isAdmin);
    });
  }

  ngOnInit(): void {
    this.http.get('/product').subscribe(data => {
      this.products = data;
    });
  }

  saveShelf() {
    this.http.post('/shelf', this.shelf)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/shelf-details', id]);
        }, (err) => {
          console.log(err);
        }
      );
  }


}
