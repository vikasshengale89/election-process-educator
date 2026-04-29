import { Component, ChangeDetectionStrategy, HostListener, signal, inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnDestroy {
  isIdle = signal(false);

  private idleTimeout: ReturnType<typeof setTimeout> | null = null;
  private readonly IDLE_TIME_MS = 30_000;
  private readonly platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.resetIdleTimer();
    }
  }

  @HostListener('window:mousemove')
  @HostListener('window:keydown')
  @HostListener('window:click')
  @HostListener('window:scroll')
  onUserInteraction(): void {
    if (this.isIdle()) {
      this.isIdle.set(false);
    }
    this.resetIdleTimer();
  }

  private resetIdleTimer(): void {
    if (this.idleTimeout !== null) {
      clearTimeout(this.idleTimeout);
    }
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
