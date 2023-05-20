import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { LoginService } from '../../login/login.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  LoginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: LoginService
  ) {}

  ngOnInit() {
}
