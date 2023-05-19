import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable()
export class AuthService {
  constructor() {}

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
