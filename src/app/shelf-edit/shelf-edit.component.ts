import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {AccountService} from "../services/account.service";
import { User } from "../../../models/User";


@Component({
  selector: 'app-shelf-edit',
  templateUrl: './shelf-edit.component.html',
  styleUrls: ['./shelf-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ShelfEditComponent implements OnInit {

  private user: User;
  userIsAdmin: boolean;
  products: any;
  shelf: any = {};

  statusOptions = [
    'EMPTY - UNUSED',
    'OUT OF STOCK',
    'ON ORDER',
    'LOW STOCK - RE-ORDER',
    'IN STOCK',
    'RESERVED'
  ];

  constructor(private http: HttpClient,
              private router: Router,
              private route: ActivatedRoute,
              private accountService: AccountService) {
    this.accountService.user.subscribe(x => {
      this.user = x;
      this.userIsAdmin = (this.user != null && this.user.isAdmin);
    });
  }

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
