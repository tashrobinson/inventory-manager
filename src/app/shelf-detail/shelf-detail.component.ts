import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-shelf-detail',
  templateUrl: './shelf-detail.component.html',
  styleUrls: ['./shelf-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ShelfDetailComponent implements OnInit {

  @Input()
  userIsAdmin: boolean;

  shelf: any = {};

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    if (this.router.url.includes("delete")){
      this.deleteShelf(this.route.snapshot.params['id']);
    }
    else {
      this.getShelfDetail(this.route.snapshot.params['id']);
    }
  }

  getShelfDetail(id) {
    this.http.get('/shelf/'+id).subscribe(data => {
      this.shelf = data;
    });
  }

  deleteShelf(id) {
    this.http.delete('/shelf/'+id)
      .subscribe(res => {
          this.router.navigate(['/shelflist']);
        }, (err) => {
          console.log(err);
        }
      );
  }
}
