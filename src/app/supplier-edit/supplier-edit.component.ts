import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {AccountService} from "../services/account.service";
import { User } from "../../../models/User";


@Component({
  selector: 'app-supplier-edit',
  templateUrl: './supplier-edit.component.html',
  styleUrls: ['./supplier-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SupplierEditComponent implements OnInit {

  private user: User;
  userIsAdmin: boolean;

  supplier: any = {};

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute,
              private accountService: AccountService) {
    this.accountService.user.subscribe(x => {
      this.user = x;
      this.userIsAdmin = (this.user != null && this.user.isAdmin);
    });
  }

  ngOnInit() {
    this.getSupplier(this.route.snapshot.params['id']);
  }

  getSupplier(id) {
    this.http.get('/supplier/'+id).subscribe(data => {
      this.supplier = data;
    });
  }

  updateSupplier(id) {
    this.http.put('/supplier/'+id, this.supplier)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/supplier-details', id]);
        }, (err) => {
          console.log(err);
        }
      );
  }


}
