import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { vi } from 'vitest';
import { PerformanceService } from './performance.service';
import { LoggingService } from './logging.service';

describe('PerformanceService', () => {
  const loggerInfo = vi.fn();

  beforeEach(() => {
    vi.restoreAllMocks();
    loggerInfo.mockReset();
    TestBed.configureTestingModule({
      providers: [
        { provide: PLATFORM_ID, useValue: 'browser' },
        { provide: LoggingService, useValue: { info: loggerInfo } },
      ],
    });
  });

  it('should be created', () => {
    const service = TestBed.inject(PerformanceService);
    expect(service).toBeTruthy();
  });

  it('should start and end traces', () => {
    vi.spyOn(performance, 'now').mockReturnValueOnce(10).mockReturnValueOnce(25);

    const service = TestBed.inject(PerformanceService);
    service.startTrace('t1');
    const duration = service.endTrace('t1');

    expect(duration).toBe(15);
    expect(loggerInfo).toHaveBeenCalled();
  });

  it('should report zero duration when no trace exists', () => {
    const service = TestBed.inject(PerformanceService);
    expect(service.endTrace('missing')).toBe(0);
  });
});
