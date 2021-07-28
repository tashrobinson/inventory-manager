import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-shelf-edit',
  templateUrl: './shelf-edit.component.html',
  styleUrls: ['./shelf-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ShelfEditComponent implements OnInit {

  products: any;
  shelf: any = {};

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getShelf(this.route.snapshot.params['id']);

    this.http.get('/product').subscribe(data => {
      this.products = data;
    });
  }

  getShelf(id) {
    this.http.get('/shelf/'+id).subscribe(data => {
      this.shelf = data;
    });
  }

  updateShelf(id) {
    this.http.put('/shelf/'+id, this.shelf)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/shelf-details', id]);
        }, (err) => {
          console.log(err);
        }
      );
  }


}
