import { Component, ChangeDetectionStrategy, signal, inject, AfterViewInit, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../auth';
import { Router } from '@angular/router';
import { I18nService } from '../core/services/i18n.service';
import { AnalyticsService } from '../core/services/analytics.service';
import { environment } from '../../environments/environment';

declare const grecaptcha: {
  ready: (cb: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
};

interface GoogleCredentialResponse {
  credential: string;
  select_by: string;
}

interface GoogleAccountsId {
  initialize: (config: Record<string, unknown>) => void;
  renderButton: (element: HTMLElement, config: Record<string, unknown>) => void;
}

interface WindowWithGoogle {
  google?: {
    accounts: {
      id: GoogleAccountsId;
    };
  };
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login implements AfterViewInit, OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  readonly i18n = inject(I18nService);
  private readonly analytics = inject(AnalyticsService);
  private readonly platformId = inject(PLATFORM_ID);

  isLoading = signal(false);
  error = signal<string | null>(null);
  googleReady = signal(false);

  private gsiRetryTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initGoogleSignIn();
    }
  }

  ngOnDestroy(): void {
    if (this.gsiRetryTimer !== null) {
      clearTimeout(this.gsiRetryTimer);
    }
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

  private initGoogleSignIn(retryCount = 0): void {
    const gWindow = window as unknown as WindowWithGoogle;
    const gsi = gWindow.google?.accounts?.id;
    if (gsi) {
      gsi.initialize({
        client_id: environment.googleClientId,
        callback: this.handleCredentialResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      const buttonElement = document.getElementById('google-signin-btn');
      if (buttonElement) {
        gsi.renderButton(buttonElement, {
          type: 'standard',
          theme: 'outline',
          size: 'large',
          width: 370,
          text: 'continue_with',
          shape: 'rectangular',
          logo_alignment: 'left',
        });
        this.googleReady.set(true);
      }
    } else if (retryCount < 10) {
      this.gsiRetryTimer = setTimeout(() => this.initGoogleSignIn(retryCount + 1), 300);
    }
  }

  private handleCredentialResponse(response: GoogleCredentialResponse): void {
    this.isLoading.set(true);
    this.error.set(null);
    this.analytics.trackEvent('login', 'auth', 'google');
    this.authService.loginWithGoogleCredential(response.credential);
  }

  private executeWithRecaptcha(action: string, callback: () => void): void {
    if (typeof grecaptcha !== 'undefined') {
      grecaptcha.ready(() => {
        grecaptcha.execute(environment.recaptchaSiteKey, { action })
          .then(() => callback())
          .catch(() => callback());
      });
    } else {
      callback();
    }
  }
}
