import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptors, HttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { errorInterceptor } from './error.interceptor';

describe('errorInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([errorInterceptor])),
        provideHttpClientTesting()
      ]
    });
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should pass through successful requests', () => {
    const testData = { message: 'success' };
    let result: unknown;

    http.get('/api/test').subscribe(data => { result = data; });

    const req = httpMock.expectOne('/api/test');
    req.flush(testData);

    expect(result).toEqual(testData);
  });

  it('should handle server errors', () => {
    let error: Error | undefined;

    http.get('/api/test').subscribe({
      error: (err: Error) => { error = err; }
    });

    const req = httpMock.expectOne('/api/test');
    req.flush('Server error', { status: 500, statusText: 'Internal Server Error' });

    expect(error).toBeTruthy();
    expect(error?.message).toContain('500');
  });

  it('should handle 404 errors', () => {
    let error: Error | undefined;

    http.get('/api/missing').subscribe({
      error: (err: Error) => { error = err; }
    });

    const req = httpMock.expectOne('/api/missing');
    req.flush('Not Found', { status: 404, statusText: 'Not Found' });

    expect(error).toBeTruthy();
    expect(error?.message).toContain('404');
  });

  it('should handle network errors', () => {
    let error: Error | undefined;

    http.get('/api/test').subscribe({
      error: (err: Error) => { error = err; }
    });

    const req = httpMock.expectOne('/api/test');
    req.error(new ProgressEvent('error'));

    expect(error).toBeTruthy();
  });
});
