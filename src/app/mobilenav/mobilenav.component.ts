import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-mobilenav',
  templateUrl: './mobilenav.component.html',
  styleUrls: ['./mobilenav.component.css']
})
export class MobilenavComponent implements OnInit {

  currentLink: string;
  currentTitle: string;
  prevLink: string;
  nextLink: string;

  titles = ['Products', 'Suppliers', 'Shelves', 'Users'];
  links = ['/productlist', '/supplierlist', '/shelflist', '/userlist'];


  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentLink = this.router.url;
    console.log(`mobile nav current - ${this.currentLink}`);

    if (this.currentLink === '/') this.currentLink = '/productlist';
    this.updateNavDetails();
  }

  navigate(page){
    console.log("navigate " + page)
    this.currentLink = page;
    this.updateNavDetails();
    this.router.navigate([page]);
  }

  updateNavDetails(){
    let index = this.links.indexOf(this.currentLink);
    if (index < 0) index = 0;
    this.currentTitle = this.titles[index];
    this.prevLink = index > 0 ? this.links[index - 1] : this.links[this.links.length - 1];
    this.nextLink = index < this.links.length - 1 ? this.links[index + 1] : this.links[0];
  }

}
