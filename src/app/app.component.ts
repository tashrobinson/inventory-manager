import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HeaderComponent} from "./header/header.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'inventory-manager';

  loggedin: boolean = false;
  _opened: boolean;
  current: string;
  constructor(private router: Router, private route: ActivatedRoute, private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.current = this.router.url;
    console.log("NavBar current route: " + this.current);
    this._opened = true;
  }

  navigate(page){
    this.current = page;
    this.router.navigate([page]);
  }

  login(){
    this.loggedin = true;
    this.ref.detectChanges();
  }

}
