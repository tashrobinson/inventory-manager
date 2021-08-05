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
    this.http.post('/supplier', this.supplier)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/supplier-details', id]);
        }, (err) => {
          console.log(err);
        }
      );
  }

}
