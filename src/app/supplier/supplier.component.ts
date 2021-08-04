import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SupplierComponent implements OnInit {

  @Input()
  userIsAdmin: boolean;

  searchtext: string;
  suppliers: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('/supplier').subscribe(data => {
      this.suppliers = data;
    });

  }

}
