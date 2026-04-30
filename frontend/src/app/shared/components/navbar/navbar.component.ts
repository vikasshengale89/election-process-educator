import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../auth';
import { I18nService } from '../../../core/services/i18n.service';
import { NotificationIndicatorComponent } from '../notification-indicator/notification-indicator.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NotificationIndicatorComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private readonly authService = inject(AuthService);
  readonly i18n = inject(I18nService);
  readonly isMenuOpen = signal(false);
  readonly currentUser = computed(() => this.authService.currentUser());

  toggleMenu(): void {
    this.isMenuOpen.update(v => !v);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  switchLanguage(): void {
    this.i18n.switchLanguage();
  }

  logout(): void {
    this.authService.logout();
    this.closeMenu();
  }
}
