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
  public users = UserTable.users;

  constructor(private router: Router, private requestService: RequestService) {
    this.userSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem('user')!)
    );
  }

  login(emailaddr: string) {
    const user = this.users.find((x) => x.email === emailaddr);
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }
  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  public get userValue() {
    return this.userSubject.value;
  }

  getToken(): string {
    if (this.userSubject.value) return this.userSubject.value.token;
    return 'secure-token-123';
  }

  isAuthenticated(): boolean {
    return true;
  }
}
