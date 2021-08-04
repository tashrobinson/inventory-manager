import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  @Input()
  userIsAdmin: boolean;

  user: any = {};

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    if (this.router.url.includes("delete")){
      this.deleteUser(this.route.snapshot.params['id']);
    }
    else {
      this.getUserDetail(this.route.snapshot.params['id']);
    }
  }

  getUserDetail(id) {
    this.http.get('/user/'+id).subscribe(data => {
      this.user = data;
    });
  }

  deleteUser(id) {
    this.http.delete('/user/'+id)
      .subscribe(res => {
          this.router.navigate(['/userlist']);
        }, (err) => {
          console.log(err);
        }
      );
  }

}
