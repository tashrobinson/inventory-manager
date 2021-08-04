import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserComponent implements OnInit {

  @Input()
  userIsAdmin: boolean;

  searchtext: string;
  users: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('/user').subscribe(data => {
      this.users = data;
    });
  }

}
