import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RequestService } from '../request.service';
import { HttpHeaders } from '@angular/common/http';
import { map, debounceTime, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { User, UserTable } from '../data/user.data';
import jwt_decode from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';

const LOGIN_URL = 'api/login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public user: User;
  public users = UserTable.users;
  public token: string;

  constructor(private router: Router, private requestService: RequestService) {}

  login(emailaddr: string) {
    this.user = this.users.find((x) => x.email === emailaddr);
    if (!this.user) console.log('Username or password is incorrect');
    else {
      console.log(this.user);
      //localStorage.setItem('user', JSON.stringify(this.user));
      this.token = this.user.token;
    }

    console.log(this.user);
  }

  getToken(): string {
    if (this.user) return this.user.token;
    return '';
  }

  isAuthenticated(): boolean {
    console.log(this.user);
    if (this.user) return true;
    return false;
  }
}
