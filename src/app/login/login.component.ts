import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService} from "../services/account.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

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
  loading = false;
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

    this.accountService.login(this.f.username.value, this.getHash(this.f.password.value))
      .pipe(first())
      .subscribe({
        next: () => {
          console.log("Login " + this.f.username.value)
          this.loginEvent.emit(this.f.username.value);
          // get return url from query parameters or default to home page
          //const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          //this.router.navigateByUrl(returnUrl);
        },
        error: error => {
          this.failed = true;
          this.loading = false;
        }
      });



  }

  register() {
    console.log("register emit!")
    this.registerEvent.emit();
  }

  getHash(password) {
    let hash = 0;
    if (password == null || password.length == 0) {
      return hash;
    }
    for (let i = 0; i < password.length; i++) {
      let char = password.charCodeAt(i);
      hash = ((hash<<5)-hash)+char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString();
  }

}
