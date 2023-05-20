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
      localStorage.setItem('user', JSON.stringify(user));
      this.token = user.token;

      this.userSubject.next(user);
    }

    console.log(this.token);
  }
  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  public get userValue() {
    return this.userSubject.value;
  }

  getToken(): string {
    return 'secure-token-123';
  }

  isAuthenticated(): boolean {
    return true;
  }

  getDecodedAccessToken(): void {
    const token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODQ0ODk1ODEsImV4cCI6MTcxNjAyNTU4MSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.RC2jdG9-vwsLktPjtzXNPyZPavI35H3Altns4ZHB3D8';
    try {
      const tokeninfo = jwt_decode(token);
      console.log(tokeninfo);
    } catch (Error) {
      const tokeninfo = null;
    }
  }
}
