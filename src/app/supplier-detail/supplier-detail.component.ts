import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {AccountService} from "../services/account.service";
import { User } from "../../../models/User";

@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SupplierDetailComponent implements OnInit {

  private user: User;
  userIsAdmin: boolean;
  popoverTitle = 'Are you sure?';
  popoverMessage = 'Are you really <b>sure</b> you want to do this?<br />';

  supplier: any = {};

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient,
              private accountService: AccountService) {
    this.accountService.user.subscribe(x => {
      this.user = x;
      this.userIsAdmin =(this.user != null && this.user.isAdmin);
    });
  }

  ngOnInit() {
    if (this.router.url.includes("delete")){
      this.deleteSupplier(this.route.snapshot.params['id']);
    }
    else {
      this.getSupplierDetail(this.route.snapshot.params['id']);
    }

  }

  getSupplierDetail(id) {
    this.http.get('/supplier/'+id).subscribe(data => {
      this.supplier = data;
    });
  }

  deleteSupplier(id) {
    this.http.delete('/supplier/'+id)
      .subscribe(res => {
          this.router.navigate(['/supplierlist']);
        }, (err) => {
          console.log(err);
        }
      );
  }

  cancel(){}
}
