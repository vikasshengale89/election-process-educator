import { Injectable, inject, PLATFORM_ID, DestroyRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
  private readonly destroyRef = inject(DestroyRef);
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

  /** Funnel milestones for Democracy Guide features (GA event names preserved). */
  trackWizardStart(): void {
    this.trackEvent('wizard_start', 'Feature');
  }

  trackWizardComplete(): void {
    this.trackEvent('wizard_complete', 'Feature');
  }

  trackQuizStart(): void {
    this.trackEvent('quiz_start', 'Feature');
  }

  trackQuizComplete(score: number): void {
    this.trackEvent('quiz_complete', 'Feature', undefined, score);
  }

  trackGlossarySearch(queryLength: number): void {
    this.trackEvent('glossary_search', 'Feature', undefined, queryLength);
  }

  trackPollingSearch(): void {
    this.trackEvent('polling_search', 'Feature');
  }

  trackShareClick(platform: string): void {
    this.trackEvent('share_click', 'Feature', platform);
  }

  /**
   * Optional engagement payloads (dwell time approximation, completions, repeats).
   * Maps to GA with a stable category for dashboards.
   */
  trackUserEngagement(action: string, label?: string, value?: number): void {
    this.trackEvent(action, 'User Engagement', label, value);
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
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(event => {
      window.gtag?.('event', 'page_view', {
        page_path: event.urlAfterRedirects
      });
    });
  }
}
