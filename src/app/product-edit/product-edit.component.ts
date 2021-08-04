import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductEditComponent implements OnInit {

  @Input()
  userIsAdmin: boolean;

  suppliers: any;
  product: any = {};

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

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

