import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  styleUrls: ['./shelf.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ShelfComponent implements OnInit {

  @Input()
  userIsAdmin: boolean;

  searchtext: string;
  shelves: any;
  products: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('/shelf').subscribe(data => {
      this.shelves = data;
    });
    this.http.get('/product').subscribe(data => {
      this.products = data;
    });

  }

}
