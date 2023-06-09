import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  LoginForm: FormGroup;
  LogoutForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: LoginService
  ) {}

  ngOnInit() {
    this.LoginForm = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(50)],
      ],
    });
  }

  onSubmit(loginData: any) {
    this.service.login(loginData.email);
    this.LoginForm.reset();
    window.location.reload();
    this.router.navigate(['']);
  }

  logout() {
    this.service.logout();
    this.LoginForm.reset();
    window.location.reload();
    this.router.navigate(['']);
  }

  get email() {
    return this.LoginForm.get('email');
  }
}
