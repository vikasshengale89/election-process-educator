import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  isLoading = signal(false);
  error = signal<string | null>(null);

  constructor(private authService: AuthService, private router: Router) {
    // If already logged in, redirect to home
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  loginWithGoogle(): void {
    this.isLoading.set(true);
    this.error.set(null);
    this.authService.getGoogleAuthUrl().subscribe({
      next: (response) => {
        window.location.href = response.url;
      },
      error: () => {
        this.error.set('Failed to initiate Google login. Please try again.');
        this.isLoading.set(false);
      }
    });
  }

  loginAsGuest(): void {
    this.isLoading.set(true);
    this.error.set(null);
    this.authService.loginAsGuest().subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: () => {
        this.error.set('Failed to start guest session. Please try again.');
        this.isLoading.set(false);
      }
    });
  }
}
