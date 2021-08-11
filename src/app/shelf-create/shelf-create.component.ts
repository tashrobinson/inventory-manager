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
  duplicateId: boolean;
  duplicateLocation: boolean;

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

    this.duplicateId = false;
    this.duplicateLocation = false;

    this.http.post('/shelf', this.shelf)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/shelf-details', id]);
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
                if (key === "location"){
                  this.duplicateLocation = true;
                }
              }
            }
          }
        }
      );
  }


}
