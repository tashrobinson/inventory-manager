import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  styleUrls: ['./shelf.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ShelfComponent implements OnInit {

  searchtext: string;
  shelves: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('/shelf').subscribe(data => {
      this.shelves = data;
    });

  }

}
