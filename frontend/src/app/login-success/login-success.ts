import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth';

@Component({
  selector: 'app-login-success',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="login-page">
      <div class="glass-panel auth-card">
        <div class="auth-icon" aria-hidden="true">✅</div>
        <h2>Authenticating...</h2>
        <p>Please wait while we verify your session.</p>
      </div>
    </div>
  `,
  styles: [`
    .login-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; }
    .auth-card { text-align: center; padding: var(--space-12); max-width: 400px; margin: 0 auto; }
    .auth-icon { font-size: 3rem; margin-bottom: var(--space-4); }
  `]
})
export class LoginSuccess implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private subscription: Subscription | null = null;

  ngOnInit(): void {
    this.subscription = this.route.queryParams.subscribe(params => {
      const sessionId = params['session_id'] as string | undefined;
      if (sessionId) {
        this.authService.setSession(sessionId);
        this.authService.setCurrentUser({ id: 'oauth', name: 'User', isGuest: false });
        this.router.navigate(['/']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
