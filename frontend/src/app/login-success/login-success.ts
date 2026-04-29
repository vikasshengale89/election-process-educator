import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth';

@Component({
  selector: 'app-login-success',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="login-page">
      <div class="glass-panel" style="text-align:center;padding:3rem;max-width:400px;margin:0 auto;">
        <div style="font-size:3rem;margin-bottom:1rem;">✅</div>
        <h2>Authenticating...</h2>
        <p>Please wait while we verify your session.</p>
      </div>
    </div>
  `,
  styles: [`.login-page { min-height:100vh; display:flex; align-items:center; justify-content:center; }`]
})
export class LoginSuccess implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const sessionId = params['session_id'] as string | undefined;
      if (sessionId) {
        this.authService.setSession(sessionId);
        this.router.navigate(['/']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}
