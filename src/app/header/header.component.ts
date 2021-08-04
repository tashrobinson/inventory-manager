import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input()
  loggedInUser: any;

  @Output()
  loginEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  loginClick(){
     this.loginEvent.emit('');
  }

}
