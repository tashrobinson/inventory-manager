import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductDetailComponent implements OnInit {

  @Input()
  userIsAdmin: boolean;

  product: any = {};

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

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
