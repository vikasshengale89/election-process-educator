import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LoggingService } from './logging.service';

interface PerformanceMetric {
  readonly name: string;
  readonly startTime: number;
}

@Injectable({ providedIn: 'root' })
export class PerformanceService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly logger = inject(LoggingService);
  private readonly activeTraces = new Map<string, PerformanceMetric>();

  startTrace(name: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.activeTraces.set(name, { name, startTime: performance.now() });
  }

  endTrace(name: string): number {
    if (!isPlatformBrowser(this.platformId)) return 0;
    const trace = this.activeTraces.get(name);
    if (!trace) return 0;

    const duration = performance.now() - trace.startTime;
    this.activeTraces.delete(name);
    this.logger.info(`Performance trace: ${name}`, { duration: Math.round(duration) });

    this.reportToAnalytics(name, duration);
    return duration;
  }

  measureNavigation(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const observer = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming;
          this.logger.info('Navigation performance', {
            domContentLoaded: Math.round(navEntry.domContentLoadedEventEnd - navEntry.startTime),
            loadComplete: Math.round(navEntry.loadEventEnd - navEntry.startTime),
            ttfb: Math.round(navEntry.responseStart - navEntry.requestStart),
          });
        }
      }
    });

    observer.observe({ type: 'navigation', buffered: true });
  }

  measureLCP(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const observer = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      if (lastEntry) {
        this.logger.info('Largest Contentful Paint', {
          lcp: Math.round(lastEntry.startTime),
        });
        this.reportToAnalytics('lcp', lastEntry.startTime);
      }
    });

    observer.observe({ type: 'largest-contentful-paint', buffered: true });
  }

  measureFID(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const observer = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const fidEntry = entry as PerformanceEventTiming;
        const fidMs = fidEntry.processingStart - fidEntry.startTime;
        this.logger.info('First Input Delay', {
          fid: Math.round(fidMs),
        });
        this.reportToAnalytics('fid', fidMs);
      }
    });

    observer.observe({ type: 'first-input', buffered: true });
  }

  measureCLS(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    let clsValue = 0;
    const observer = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const layoutShift = entry as PerformanceEntry & { hadRecentInput: boolean; value: number };
        if (!layoutShift.hadRecentInput) {
          clsValue += layoutShift.value;
        }
      }
      this.reportToAnalytics('cls', clsValue);
    });

    observer.observe({ type: 'layout-shift', buffered: true });
  }

  private reportToAnalytics(metricName: string, value: number): void {
    window.gtag?.('event', 'web_vitals', {
      event_category: 'Web Vitals',
      event_label: metricName,
      value: Math.round(value),
      non_interaction: true,
    });
  }
}
