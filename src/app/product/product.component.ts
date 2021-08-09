import { Component, OnInit, ViewEncapsulation, Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountService } from "../services/account.service";
import { User } from '../../../models/User';
import { Router } from "@angular/router";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductComponent implements OnInit {

  private user: User;
  userIsAdmin: boolean;
  searchText: string;
  products: any;
  popoverTitle = 'Are you sure?';
  popoverMessage = 'Are you really <b>sure</b> you want to do this?';

  constructor(private router: Router,
              private http: HttpClient,
              private accountService: AccountService) {
    this.accountService.user.subscribe(x => {
      this.user = x;
      this.userIsAdmin = (this.user != null && this.user.isAdmin);
      console.log(`Product subscription update ${this.user}`);
    });
  }

  ngOnInit(): void {
    this.http.get('/product').subscribe(data => {
      this.products = data;
    });
  }

  deleteProduct(id) {
    console.log(`deleting ${id}`)
    this.http.delete(`/product/${id}`)
      .subscribe(res => {
          this.ngOnInit(); //reload the table
        }, (err) => {
          console.log(err);
        }
      );
  }

  cancel(){}

}
