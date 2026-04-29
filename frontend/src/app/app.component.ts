import { Component, ChangeDetectionStrategy, HostListener, signal, inject, PLATFORM_ID, OnDestroy, Renderer2, DestroyRef } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { AuthService } from './auth';
import { I18nService } from './core/services/i18n.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnDestroy {
  readonly isIdle = signal(false);
  readonly showNavbar = signal(false);

  private idleTimeout: ReturnType<typeof setTimeout> | null = null;
  private readonly IDLE_TIME_MS = 60_000;
  private readonly platformId = inject(PLATFORM_ID);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  readonly i18n = inject(I18nService);
  private readonly renderer = inject(Renderer2);
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.resetIdleTimer();
      this.updateDocLang();
    }

    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(event => {
      const isLoginRoute = event.urlAfterRedirects.startsWith('/login');
      this.showNavbar.set(!isLoginRoute && this.authService.isLoggedIn());
      if (this.isIdle()) {
        this.isIdle.set(false);
      }
      this.resetIdleTimer();
      this.updateDocLang();
    });
  }

  @HostListener('window:mousemove')
  @HostListener('window:keydown')
  @HostListener('window:click')
  @HostListener('window:scroll')
  @HostListener('window:touchstart')
  onUserInteraction(): void {
    if (this.isIdle()) {
      this.isIdle.set(false);
    }
    this.resetIdleTimer();
  }

  private updateDocLang(): void {
    const lang = this.i18n.currentLang();
    this.renderer.setAttribute(this.document.documentElement, 'lang', lang);
  }

  private resetIdleTimer(): void {
    if (this.idleTimeout !== null) {
      clearTimeout(this.idleTimeout);
    }
    if (!this.authService.isLoggedIn()) return;

    this.idleTimeout = setTimeout(() => {
      this.isIdle.set(true);
    }, this.IDLE_TIME_MS);
  }

  ngOnDestroy(): void {
    if (this.idleTimeout !== null) {
      clearTimeout(this.idleTimeout);
    }
  }
}
