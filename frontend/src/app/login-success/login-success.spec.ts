import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { LoginSuccess } from './login-success';
import { AuthService } from '../auth';

describe('LoginSuccess', () => {
  let authService: AuthService;

  function setup(queryParams: Record<string, string> = {}): void {
    TestBed.configureTestingModule({
      imports: [LoginSuccess],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([
          { path: '', component: class {} as never },
          { path: 'login', component: class {} as never }
        ]),
        {
          provide: ActivatedRoute,
          useValue: { queryParams: of(queryParams) }
        }
      ]
    });
    authService = TestBed.inject(AuthService);
  }

  beforeEach(() => {
    localStorage.clear();
  });

  it('should create', () => {
    setup({ session_id: 'test-session-123' });
    const fixture = TestBed.createComponent(LoginSuccess);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should set session and user when session_id is present', () => {
    setup({ session_id: 'test-session-456' });
    const spy = vi.spyOn(authService, 'setSession');
    const userSpy = vi.spyOn(authService, 'setCurrentUser');

    const fixture = TestBed.createComponent(LoginSuccess);
    fixture.componentInstance.ngOnInit();

    expect(spy).toHaveBeenCalledWith('test-session-456');
    expect(userSpy).toHaveBeenCalledWith({ id: 'oauth', name: 'User', isGuest: false });
  });

  it('should navigate to login when no session_id', () => {
    setup({});
    const fixture = TestBed.createComponent(LoginSuccess);
    fixture.componentInstance.ngOnInit();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should display authenticating message', async () => {
    setup({ session_id: 'test' });
    const fixture = TestBed.createComponent(LoginSuccess);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Authenticating');
  });

  it('should clean up subscription on destroy', () => {
    setup({ session_id: 'test' });
    const fixture = TestBed.createComponent(LoginSuccess);
    fixture.componentInstance.ngOnInit();
    expect(() => fixture.componentInstance.ngOnDestroy()).not.toThrow();
  });
});
