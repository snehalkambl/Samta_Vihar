import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  username: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private apiUrl = 'http://localhost:8080/api/auth';

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, payload).pipe(
      tap((response) => {
        if (this.isBrowser()) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('username', response.username);
          localStorage.setItem('role', response.role?.trim().toUpperCase());
        }
      })
    );
  }

  logout(): void {
    if (!this.isBrowser()) return;

    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
  }

  isLoggedIn(): boolean {
    if (!this.isBrowser()) return false;

    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    return !!token && !!role;
  }

  getToken(): string {
    if (!this.isBrowser()) return '';
    return localStorage.getItem('token') || '';
  }

  getUsername(): string {
    if (!this.isBrowser()) return '';
    return localStorage.getItem('username') || '';
  }

  getRole(): string {
    if (!this.isBrowser()) return '';
    return localStorage.getItem('role') || '';
  }

  isAdmin(): boolean {
    if (!this.isBrowser()) return false;

    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    return !!token && role?.trim().toUpperCase() === 'ADMIN';
  }

  isUser(): boolean {
    if (!this.isBrowser()) return false;

    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    return !!token && role?.trim().toUpperCase() === 'USER';
  }

  forgotPassword(payload: {
  username: string;
  resetCode: string;
  newPassword: string;
}) {
  return this.http.post(`${this.apiUrl}/forgot-password`, payload, {
    responseType: 'text'
  });
}
sendResetOtp(payload: { username: string }) {
  return this.http.post(`${this.apiUrl}/send-reset-otp`, payload, {
    responseType: 'text'
  });
}

resetPassword(payload: {
  username: string;
  otp: string;
  newPassword: string;
}) {
  return this.http.post(`${this.apiUrl}/reset-password`, payload, {
    responseType: 'text'
  });
}
}