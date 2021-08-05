import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AccountService } from "../services/account.service";
import { User } from '../../../models/User';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductEditComponent implements OnInit {

  private user: User;
  userIsAdmin: boolean;

  suppliers: any;
  product: any = {};

  constructor(private http: HttpClient,
              private router: Router,
              private route: ActivatedRoute,
              private accountService: AccountService) {
    this.accountService.user.subscribe(x => {
      this.user = x;
      this.userIsAdmin = (this.user != null && this.user.isAdmin);
      console.log(`Product Edit subscription update ${this.user}`);
    });
  }

  ngOnInit() {
    this.getProduct(this.route.snapshot.params['id']);

    this.http.get('/supplier').subscribe(data => {
      this.suppliers = data;
    });

  }

  getProduct(id) {
    this.http.get('/product/'+id).subscribe(data => {
      this.product = data;
    });
  }

  updateProduct(id) {
    this.http.put('/product/'+id, this.product)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/product-details', id]);
        }, (err) => {
          console.log(err);
        }
      );
  }
}

