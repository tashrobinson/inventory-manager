import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AccountService} from "../services/account.service";
import { User } from "../../../models/User";

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SupplierComponent implements OnInit {

  private user: User;
  userIsAdmin: boolean;

  searchtext: string;
  suppliers: any;

  constructor(private http: HttpClient,
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

}
