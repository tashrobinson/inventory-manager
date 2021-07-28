import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-supplier-edit',
  templateUrl: './supplier-edit.component.html',
  styleUrls: ['./supplier-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SupplierEditComponent implements OnInit {

  supplier: any = {};

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

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
