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
  private userSubject: BehaviorSubject<User | null>;

  public user: User;
  public users = UserTable.users;
  public token: string;

  constructor(private router: Router, private requestService: RequestService) {
    this.userSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem('user')!)
    );
  }

  login(emailaddr: string) {
    const user = this.users.find((x) => x.email === emailaddr);
    if (!user) console.log('Username or password is incorrect');
    else {
      console.log(user);

      localStorage.setItem('user', JSON.stringify(user));
      this.token = user.token;
      this.userSubject.next(user);
    }

    console.log(this.token);
  }
  logout() {
    console.log('logout');
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  public get userValue() {
    return this.userSubject.value;
  }
}
