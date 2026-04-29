import { Injectable, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

export interface User {
  readonly id: string;
  readonly name: string;
  readonly email?: string;
  readonly picture?: string;
  readonly isGuest: boolean;
}

interface GuestResponse {
  readonly session_id: string;
  readonly user: User;
}

interface GoogleJwtPayload {
  readonly sub: string;
  readonly name: string;
  readonly email: string;
  readonly picture: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = '/api/v1/auth';
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly _currentUser = signal<User | null>(null);
  readonly currentUser = this._currentUser.asReadonly();
  readonly isLoggedIn = computed(() => !!this._currentUser() || !!this.getSession());

  constructor() {
    this.restoreSession();
  }

  loginWithGoogleCredential(credential: string): void {
    const payload = this.decodeJwt(credential);
    if (!payload) return;

    const user: User = {
      id: payload.sub,
      name: payload.name,
      email: payload.email,
      picture: payload.picture,
      isGuest: false
    };

    const sessionId = `google-${payload.sub}-${Date.now()}`;
    this.setSession(sessionId);
    this.persistUser(user);
    this._currentUser.set(user);
    this.router.navigate(['/']);
  }

  loginAsGuest(): Observable<GuestResponse> {
    return this.http.post<GuestResponse>(`${this.API_URL}/guest`, {}).pipe(
      tap(response => {
        this.setSession(response.session_id);
        this.persistUser(response.user);
        this._currentUser.set(response.user);
      }),
      catchError(() => {
        const guestId = `guest-${Date.now()}`;
        const fallback: GuestResponse = {
          session_id: guestId,
          user: { id: guestId, name: 'Guest User', isGuest: true }
        };
        this.setSession(fallback.session_id);
        this.persistUser(fallback.user);
        this._currentUser.set(fallback.user);
        return of(fallback);
      })
    );
  }

  setSession(sessionId: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('session_id', sessionId);
    }
  }

  getSession(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('session_id');
    }
    return null;
  }

  setCurrentUser(user: User): void {
    this._currentUser.set(user);
    this.persistUser(user);
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('session_id');
      localStorage.removeItem('user_data');
    }
    this._currentUser.set(null);
    this.router.navigate(['/login']);
  }

  getGoogleClientId(): string {
    return environment.googleClientId;
  }

  private persistUser(user: User): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('user_data', JSON.stringify(user));
    }
  }

  private restoreSession(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const sessionId = this.getSession();
    if (!sessionId) return;

    const stored = localStorage.getItem('user_data');
    if (stored) {
      try {
        const user = JSON.parse(stored) as User;
        this._currentUser.set(user);
      } catch {
        this._currentUser.set({ id: 'local', name: 'Guest User', isGuest: true });
      }
      return;
    }

    this._currentUser.set({ id: 'local', name: 'Guest User', isGuest: true });
  }

  private decodeJwt(token: string): GoogleJwtPayload | null {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64).split('').map(c =>
          '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        ).join('')
      );
      return JSON.parse(jsonPayload) as GoogleJwtPayload;
    } catch {
      return null;
    }
  }
}
