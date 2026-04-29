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
        provideRouter([
          { path: 'login', component: class {} as never }
        ])
      ]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start logged out with no session', () => {
    expect(service.currentUser()).toBeNull();
  });

  it('should set and get session', () => {
    service.setSession('test-session');
    expect(service.getSession()).toBe('test-session');
  });

  it('should set current user and persist', () => {
    service.setCurrentUser({ id: '1', name: 'Test', isGuest: false });
    expect(service.currentUser()?.name).toBe('Test');
    expect(localStorage.getItem('user_data')).toBeTruthy();
  });

  it('should report logged in when session exists', () => {
    service.setSession('test');
    expect(service.isLoggedIn()).toBe(true);
  });

  it('should clear session on logout', () => {
    service.setSession('test');
    service.setCurrentUser({ id: '1', name: 'Test', isGuest: false });
    service.logout();
    expect(service.getSession()).toBeNull();
    expect(service.currentUser()).toBeNull();
    expect(localStorage.getItem('user_data')).toBeNull();
  });

  it('should return google client id', () => {
    const clientId = service.getGoogleClientId();
    expect(clientId).toBeTruthy();
    expect(clientId).toContain('.apps.googleusercontent.com');
  });

  it('should login as guest with fallback', () => {
    service.loginAsGuest().subscribe(response => {
      expect(response.user.isGuest).toBe(true);
      expect(service.isLoggedIn()).toBe(true);
    });
    const req = httpMock.expectOne('/api/v1/auth/guest');
    expect(req.request.method).toBe('POST');
    req.error(new ProgressEvent('error'));
  });

  it('should login as guest via backend', () => {
    service.loginAsGuest().subscribe(response => {
      expect(response.user.isGuest).toBe(true);
    });
    const req = httpMock.expectOne('/api/v1/auth/guest');
    req.flush({ session_id: 'guest-1', user: { id: 'g1', name: 'Guest User', isGuest: true } });
    expect(service.currentUser()?.name).toBe('Guest User');
  });

  it('should restore session from localStorage', () => {
    localStorage.setItem('session_id', 'saved-session');
    localStorage.setItem('user_data', JSON.stringify({ id: '1', name: 'Saved User', isGuest: false }));

    const freshService = TestBed.inject(AuthService);
    expect(freshService.isLoggedIn()).toBe(true);
  });
});
