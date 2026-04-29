import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AnalyticsService } from './analytics.service';

describe('AnalyticsService', () => {
  let service: AnalyticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([])]
    });
    service = TestBed.inject(AnalyticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have init method', () => {
    expect(typeof service.init).toBe('function');
  });

  it('should have trackEvent method', () => {
    expect(typeof service.trackEvent).toBe('function');
  });

  it('should not throw when tracking events', () => {
    expect(() => service.trackEvent('test', 'category', 'label')).not.toThrow();
  });
});
