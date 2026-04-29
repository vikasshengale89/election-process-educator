import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { AuthService } from '../auth';
import { Router } from '@angular/router';
import { I18nService } from '../core/services/i18n.service';
import { AnalyticsService } from '../core/services/analytics.service';

declare const grecaptcha: {
  ready: (cb: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
};

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  readonly i18n = inject(I18nService);
  private readonly analytics = inject(AnalyticsService);

  isLoading = signal(false);
  error = signal<string | null>(null);

  constructor() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  loginWithGoogle(): void {
    this.isLoading.set(true);
    this.error.set(null);
    this.executeWithRecaptcha('google_login', () => {
      this.authService.getGoogleAuthUrl().subscribe({
        next: (response) => {
          this.analytics.trackEvent('login', 'auth', 'google');
          window.location.href = response.url;
        },
        error: () => {
          this.error.set('Failed to initiate Google login. Please try again.');
          this.isLoading.set(false);
        }
      });
    });
  }

  loginAsGuest(): void {
    this.isLoading.set(true);
    this.error.set(null);
    this.executeWithRecaptcha('guest_login', () => {
      this.authService.loginAsGuest().subscribe({
        next: () => {
          this.analytics.trackEvent('login', 'auth', 'guest');
          this.router.navigate(['/']);
        },
        error: () => {
          this.error.set('Failed to start guest session. Please try again.');
          this.isLoading.set(false);
        }
      });
    });
  }

  private executeWithRecaptcha(action: string, callback: () => void): void {
    if (typeof grecaptcha !== 'undefined') {
      grecaptcha.ready(() => {
        grecaptcha.execute('6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI', { action })
          .then(() => callback())
          .catch(() => callback());
      });
    } else {
      callback();
    }
  }
}
