import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-supplier-create',
  templateUrl: './supplier-create.component.html',
  styleUrls: ['./supplier-create.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SupplierCreateComponent implements OnInit {

  supplier: any = {};

  constructor(private http: HttpClient, private router: Router) { }

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
