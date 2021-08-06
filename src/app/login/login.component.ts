import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService} from "../services/account.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {Md5} from "ts-md5";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output()
  loginEvent = new EventEmitter<string>();
  @Output()
  registerEvent = new EventEmitter();

  form: FormGroup;
  user: any = {};
  failed: boolean;
  submitted = false;

  constructor(private http: HttpClient,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private accountService: AccountService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.form.controls; }

  login() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    if (this.f.password.value == null) return;

    const passHash = Md5.hashStr(this.f.password.value.trim().toLowerCase());
    this.accountService.login(this.f.username.value, passHash)
      .pipe(first())
      .subscribe({
        next: () => {
          console.log("Login " + this.f.username.value)
          this.loginEvent.emit(this.f.username.value);
        },
        error: error => {
          this.failed = true;
        }
      });



  }

  register() {
    console.log("register emit!")
    this.registerEvent.emit();
  }


}
