import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

import { RegisterResponse, LoginResponse } from '@interfaces';
import { environment } from '../../environments/environment';

interface CurrentUser {
  id: number;
  nombre: string;
  email: string;
  iat: number;
  exp: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl: string = environment.apiUrl;
  private http = inject(HttpClient);
  private headers = new HttpHeaders();

  currentUser = signal<CurrentUser | null>(null);
  currentToken = signal<string | null>(null);
  tokenValid = signal<boolean>(false);
  private intervalId: any;

  constructor() {
    this.headers = new HttpHeaders({
      'Accept-Language': 'es',
    });

    const token = localStorage.getItem('atomTaksToken');
    if (!token) {
      return;
    }

    this.currentToken.set(token);
    const decoded = this.decodeToken(token);
    this.currentUser.set(decoded);

    this.startTokenValidityCheck();
  }

  login(email: string, password: string): Observable<LoginResponse> {
    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password };

    return this.http.post<LoginResponse>(url, body, { headers: this.headers });
  }

  register(
    nombre: string,
    email: string,
    password: string
  ): Observable<RegisterResponse> {
    const url = `${this.baseUrl}/auth/register`;
    const body = { nombre, email, password };

    return this.http.post<RegisterResponse>(url, body, {
      headers: this.headers,
    });
  }

  logout() {
    localStorage.removeItem('atomTaksToken');
    this.currentUser.set(null);
    this.currentToken.set(null);
    this.stopTokenValidityCheck();
  }

  /* funciones de token */
  setToken(token: string) {
    this.currentToken.set(token);
    localStorage.setItem('atomTaksToken', token);
    const decoded = this.decodeToken(token);
    this.currentUser.set(decoded);
    this.startTokenValidityCheck();
  }

  private decodeToken(token: string): CurrentUser {
    return jwtDecode<CurrentUser>(token);
  }

  /* Revision periodica */
  private updateTokenValidity(exp: number) {
    let dateToken = new Date(exp * 1000);
    let dateNow = new Date();
    const isValid = dateToken > dateNow;
    this.tokenValid.set(isValid);
  }

  private startTokenValidityCheck() {
    this.updateTokenValidity(this.currentUser()!.exp);

    this.intervalId = setInterval(() => {
      this.updateTokenValidity(this.currentUser()!.exp);
    }, 1000);
  }

  private stopTokenValidityCheck() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
