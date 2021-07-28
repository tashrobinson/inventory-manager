import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  current: string;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.current = this.router.url;
    console.log("NavBar current route: " + this.current)
  }

}
