import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {AccountService} from "../services/account.service";
import { User } from "../../../models/User";

@Component({
  selector: 'app-shelf-detail',
  templateUrl: './shelf-detail.component.html',
  styleUrls: ['./shelf-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ShelfDetailComponent implements OnInit {

  private user: User;
  userIsAdmin: boolean;
  shelf: any = {};

  constructor(private router: Router,
              private route: ActivatedRoute,
              private http: HttpClient,
              private accountService: AccountService) {
    this.accountService.user.subscribe(x => {
      this.user = x;
      this.userIsAdmin = (this.user != null && this.user.isAdmin);
    });
  }

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
