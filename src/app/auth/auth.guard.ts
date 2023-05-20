import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  CanLoad,
  Route,
} from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private loginService: LoginService,
    private authService: AuthService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const user = this.loginService.userValue;
    console.log('userserv', user);
    if (user) {
      return true;
    }
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const user = this.loginService.userValue;
    console.log('userserv', user);
    if (user) {
      return true;
    }
  }

  canLoad(route: Route): boolean {
    const user = this.loginService.userValue;
    console.log('userserv', user);
    if (user) {
      return true;
    }
  }
}
