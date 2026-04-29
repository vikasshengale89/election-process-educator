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

  it('should initialize without errors', () => {
    expect(() => service.init()).not.toThrow();
  });

  it('should track events without errors', () => {
    expect(() => service.trackEvent('test', 'category', 'label')).not.toThrow();
  });
});
