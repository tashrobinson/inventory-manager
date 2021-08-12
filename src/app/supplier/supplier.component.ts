import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AccountService} from "../services/account.service";
import { User } from "../../../models/User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SupplierComponent implements OnInit {

  private user: User;
  userIsAdmin: boolean;
  popoverTitle = 'Are you sure?';
  popoverMessage = 'Are you really <b>sure</b> you want to do this?<br />';
  searchtext: string;
  suppliers: any;

  constructor(private router: Router,
              private http: HttpClient,
              private accountService: AccountService) {
    this.accountService.user.subscribe(x => {
      this.user = x;
      this.userIsAdmin = (this.user != null && this.user.isAdmin);
    });
  }

  ngOnInit(): void {
    this.http.get('/supplier').subscribe(data => {
      this.suppliers = data;
    });

  }

  deleteSupplier(id) {
    this.http.delete('/supplier/'+id)
      .subscribe(res => {
          this.ngOnInit();
        }, (err) => {
          console.log(err);
        }
      );
  }
  cancel(){}
}
