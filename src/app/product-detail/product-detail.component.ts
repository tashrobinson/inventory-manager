import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from "../services/account.service";
import { User } from '../../../models/User';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductDetailComponent implements OnInit {

  private user: User;
  userIsAdmin: boolean;

  product: any = {};

  constructor(private router: Router,
              private route: ActivatedRoute,
              private http: HttpClient,
              private accountService: AccountService) {
    this.accountService.user.subscribe(x => {
      this.user = x;
      this.userIsAdmin = (this.user != null && this.user.isAdmin);
      console.log(`Product Detail subscription update ${this.user}`);
    });
  }

  ngOnInit() {
    if (this.router.url.includes("delete")){
      this.deleteProduct(this.route.snapshot.params['id']);
    }
    else {
      this.getProductDetail(this.route.snapshot.params['id']);
    }
  }

  getProductDetail(id) {
    this.http.get('/product/'+id).subscribe(data => {
      this.product = data;
    });
  }

  deleteProduct(id) {
    this.http.delete('/product/'+id)
      .subscribe(res => {
          this.router.navigate(['/productlist']);
        }, (err) => {
          console.log(err);
        }
      );
  }


}
