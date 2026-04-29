import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private authService = inject(AuthService);
  isMenuOpen = signal(false);

  get currentUser() {
    return this.authService.currentUser();
  }

  toggleMenu(): void {
    this.isMenuOpen.update(v => !v);
  }

  logout(): void {
    this.authService.logout();
  }
}
