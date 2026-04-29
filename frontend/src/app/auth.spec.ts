import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([{ path: 'login', children: [] }])],
      providers: [AuthService]
    });
    // Clear localStorage before each test
    localStorage.clear();

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login as guest and set session', () => {
    const mockResponse = { session_id: 'guest_123', user: { id: '1', name: 'Guest', isGuest: true } };

    service.loginAsGuest().subscribe(res => {
      expect(res).toEqual(mockResponse);
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
});
