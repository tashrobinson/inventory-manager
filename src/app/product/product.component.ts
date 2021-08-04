import { Component, OnInit, ViewEncapsulation, Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductComponent implements OnInit {

  @Input()
  userIsAdmin: boolean;
  searchText: string;
  products: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('/product').subscribe(data => {
      this.products = data;
    });

  }

}
