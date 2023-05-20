import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RequestService } from '../request.service';
import { HttpHeaders } from '@angular/common/http';
import { map, debounceTime, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

const LOGIN_URL = 'api/login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private requestService: RequestService) {}

  Login(email: string): Observable<any> {
    return this.requestService.post(`${LOGIN_URL}/`, email);
  }
}
