import { ApplicationConfig, provideZonelessChangeDetection, APP_INITIALIZER, inject } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { AnalyticsService } from './core/services/analytics.service';
import { PerformanceService } from './core/services/performance.service';

function initializeAnalytics(): () => void {
  const analytics = inject(AnalyticsService);
  return () => analytics.init();
}

function initializePerformance(): () => void {
  const perf = inject(PerformanceService);
  return () => {
    perf.measureNavigation();
    perf.measureLCP();
    perf.measureFID();
    perf.measureCLS();
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(withInterceptors([errorInterceptor])),
    provideAnimations(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAnalytics,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializePerformance,
      multi: true
    }
  ],
};
