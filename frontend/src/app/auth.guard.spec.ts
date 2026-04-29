import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter, Router } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from './auth';

describe('authGuard', () => {
  let authService: AuthService;
  let router: Router;

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
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should allow access when logged in', () => {
    authService.setSession('test');
    const result = TestBed.runInInjectionContext(() => authGuard());
    expect(result).toBe(true);
  });

  it('should deny access and redirect when not logged in', () => {
    const navigateSpy = vi.spyOn(router, 'navigate');
    const result = TestBed.runInInjectionContext(() => authGuard());
    expect(result).toBe(false);
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });
});
