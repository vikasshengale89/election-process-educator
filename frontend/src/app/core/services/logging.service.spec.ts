import { TestBed } from '@angular/core/testing';
import { LoggingService } from './logging.service';

describe('LoggingService', () => {
  let service: LoggingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have info method', () => {
    expect(() => service.info('test message')).not.toThrow();
  });

  it('should have warn method', () => {
    expect(() => service.warn('test warning')).not.toThrow();
  });

  it('should have error method', () => {
    expect(() => service.error('test error')).not.toThrow();
  });

  it('should have debug method', () => {
    expect(() => service.debug('test debug')).not.toThrow();
  });

  it('should accept data parameter', () => {
    expect(() => service.info('test', { key: 'value' })).not.toThrow();
  });
});
