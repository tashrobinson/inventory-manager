import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AccountService } from "../services/account.service";
import { User } from '../../../models/User';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductCreateComponent implements OnInit {

  private user: User;
  userIsAdmin: boolean;
  product: any = {};
  suppliers: any;
  duplicateId: boolean;

  constructor(private http: HttpClient, private router: Router, private accountService: AccountService) {
    this.accountService.user.subscribe(x => {
      this.user = x;
      this.userIsAdmin = (this.user != null && this.user.isAdmin);
      console.log(`Product Create subscription update ${this.user}`);
    });
  }

  ngOnInit() {
    this.http.get('/supplier').subscribe(data => {
      this.suppliers = data;
    });
  }

  saveProduct() {

    this.duplicateId = false;

    this.http.post('/product', this.product)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/product-details', id]);
        }, (err) => {
          //console.log(`user-create error ${JSON.stringify(err)}`);
          const theError = err.error.error;
          if (theError.code === 11000) //duplicate key error
          {
            const errorField = theError.keyPattern;

            for (let key in errorField) {
              //if the item has the key property
              if (errorField.hasOwnProperty(key)){
                //console.log(`user-create error field ${key}`)
                if (key === "id"){
                  this.duplicateId = true;
                }
              }
            }
          }
        }
      );
  }


}
