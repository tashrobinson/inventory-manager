import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {AccountService} from "../services/account.service";
import { User } from "../../../models/User";

@Component({
  selector: 'app-supplier-create',
  templateUrl: './supplier-create.component.html',
  styleUrls: ['./supplier-create.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SupplierCreateComponent implements OnInit {

  private user: User;
  userIsAdmin: boolean;
  duplicateId: boolean;
  duplicateName: boolean;
  supplier: any = {};

  constructor(private http: HttpClient, private router: Router,
              private accountService: AccountService) {
    this.accountService.user.subscribe(x => {
      this.user = x;
      this.userIsAdmin = (this.user != null && this.user.isAdmin);
    });
  }

  ngOnInit(): void {
  }

  saveSupplier() {

    this.duplicateId = false;
    this.duplicateName = false;

    this.http.post('/supplier', this.supplier)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/supplier-details', id]);
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
                if (key === "name"){
                  this.duplicateName = true;
                }
              }
            }
          }
        }
      );
  }

}
