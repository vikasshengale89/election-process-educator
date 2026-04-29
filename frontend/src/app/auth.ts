import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
  id: string;
  name: string;
  email?: string;
  isGuest: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = '/api/v1/auth';
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private _currentUser = signal<User | null>(null);
  readonly currentUser = this._currentUser.asReadonly();
  readonly isLoggedIn = computed(() => !!this._currentUser() || !!this.getSession());

  constructor() {
    this.checkSession();
  }

  getGoogleAuthUrl(): Observable<{ url: string }> {
    return this.http.get<{ url: string }>(`${this.API_URL}/google`);
  }

  loginAsGuest(): Observable<{ session_id: string; user: User }> {
    return this.http.post<{ session_id: string; user: User }>(`${this.API_URL}/guest`, {}).pipe(
      tap(response => {
        this.setSession(response.session_id);
        this._currentUser.set(response.user);
      })
    );
  }

  setSession(sessionId: string): void {
    localStorage.setItem('session_id', sessionId);
  }

  getSession(): string | null {
    return localStorage.getItem('session_id');
  }

  logout(): void {
    localStorage.removeItem('session_id');
    this._currentUser.set(null);
    this.router.navigate(['/login']);
  }

  private checkSession(): void {
    const sessionId = this.getSession();
    if (sessionId) {
      this.http.get<{ user: User }>(`${this.API_URL}/me`, {
        headers: { Authorization: `Bearer ${sessionId}` }
      }).subscribe({
        next: (response) => {
          this._currentUser.set(response.user);
        },
        error: () => {
          this._currentUser.set({ id: 'local', name: 'Guest User', isGuest: true });
        }
      });
    }
  }
}
