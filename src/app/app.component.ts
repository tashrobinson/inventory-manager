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

  loggedInUser: any = {};
  loggedIn: boolean = false;
  _opened: boolean;
  current: string;
  register: boolean;

  constructor(private router: Router, private route: ActivatedRoute, private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.current = this.router.url;
    console.log("NavBar current route: " + this.current);
    this._opened = true;
  }

  navigate(page){
    console.log("navigate " + page)
    this.current = page;
    this.router.navigate([page]);
  }

  login(user){
    this.loggedIn = true;
    this.loggedInUser = JSON.parse(user);
    console.log("Logged in user:" + JSON.stringify(this.loggedInUser))
    this.navigate("/productlist");
  }

  showRegister(){
    console.log("Show register!");
    this.current = "/register";
    this.ref.detectChanges();
  }

  completeRegister(){
    console.log("Complete register!");
    this.current = "/";
    this.ref.detectChanges();
  }

  onOutletLoaded(component) {
    console.log("setting " + component + "user: " + this.loggedInUser.username +  "userIsAdmin = " + this.loggedInUser.userIsAdmin);
    component.userIsAdmin = this.loggedInUser.isAdmin;
  }

}
