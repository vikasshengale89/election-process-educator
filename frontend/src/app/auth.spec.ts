import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { AuthService } from './auth';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([{ path: 'login', children: [] }]),
        AuthService
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not be logged in initially', () => {
    expect(service.getSession()).toBeNull();
  });

  it('should login as guest and set session', () => {
    const mockResponse = { session_id: 'guest_123', user: { id: '1', name: 'Guest', email: undefined, isGuest: true } };

    service.loginAsGuest().subscribe(res => {
      expect(res.session_id).toBe('guest_123');
      expect(service.getSession()).toBe('guest_123');
      expect(service.currentUser()?.isGuest).toBe(true);
    });

    const req = httpMock.expectOne('/api/v1/auth/guest');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should logout and clear session', () => {
    localStorage.setItem('session_id', 'test_session');
    service.logout();
    expect(service.getSession()).toBeNull();
    expect(service.currentUser()).toBeNull();
  });

  it('should set and get session', () => {
    service.setSession('abc-123');
    expect(service.getSession()).toBe('abc-123');
  });

  it('should fetch Google auth URL', () => {
    service.getGoogleAuthUrl().subscribe(res => {
      expect(res.url).toContain('https://');
    });

    const req = httpMock.expectOne('/api/v1/auth/google');
    expect(req.request.method).toBe('GET');
    req.flush({ url: 'https://accounts.google.com/o/oauth2/auth' });
  });
});
