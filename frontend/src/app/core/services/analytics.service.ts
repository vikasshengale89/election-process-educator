import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { environment } from '../../../environments/environment';

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  private initialized = false;

  init(): void {
    if (!isPlatformBrowser(this.platformId) || this.initialized) return;

    this.loadGtagScript();
    this.trackPageViews();
    this.initialized = true;
  }

  trackEvent(action: string, category: string, label?: string, value?: number): void {
    if (!isPlatformBrowser(this.platformId)) return;
    window.gtag?.('event', action, {
      event_category: category,
      event_label: label,
      value
    });
  }

  private loadGtagScript(): void {
    const gaId = environment.googleAnalyticsId;
    if (!gaId || gaId.startsWith('G-DEMO')) return;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', gaId, { send_page_view: false });
  }

  private trackPageViews(): void {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe(event => {
      window.gtag?.('event', 'page_view', {
        page_path: event.urlAfterRedirects
      });
    });
  }
}
