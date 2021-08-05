import { Component, OnInit, ViewEncapsulation, Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountService } from "../services/account.service";
import { User } from '../../../models/User';

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

  constructor(private http: HttpClient, private accountService: AccountService) {
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

}
