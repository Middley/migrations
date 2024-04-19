import { Injectable } from '@angular/core';

import { ACCESS_TOKEN_KEY, DATA, FIRST_LOGIN } from '../utils';
@Injectable()
export class JwtService {
  getToken(): string {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  getData(): string {
    return localStorage.getItem(DATA);
  }

  getFirstLogin(): string {
    return localStorage.getItem(FIRST_LOGIN);
  }

  saveToken(token: String) {
    localStorage.accessToken = token;
  }

  saveData(data: string) {
    localStorage.setItem(DATA, data);
  }

  saveFirstLogin(firstLogin: string) {
    localStorage.setItem(FIRST_LOGIN, firstLogin);
  }

  destroyToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }

  destroyData() {
    localStorage.removeItem(DATA);
  }

  destroyFistLogin() {
    localStorage.removeItem(FIRST_LOGIN);
  }

  getEmail(): string {
    const token = this.getToken();
    const decodedJwt = JSON.parse(window.atob(token.split('.')[1]));
    return decodedJwt.email;
  }
}
