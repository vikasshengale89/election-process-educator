import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { Login } from './login';

describe('Login', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Login);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have google login button', async () => {
    const fixture = TestBed.createComponent(Login);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const googleBtn = compiled.querySelector('.btn-google');
    expect(googleBtn).toBeTruthy();
  });

  it('should have guest login button', async () => {
    const fixture = TestBed.createComponent(Login);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const guestBtn = compiled.querySelector('.btn-primary');
    expect(guestBtn).toBeTruthy();
  });

  it('should not show error initially', () => {
    const fixture = TestBed.createComponent(Login);
    expect(fixture.componentInstance.error()).toBeNull();
  });

  it('should have i18n service injected', () => {
    const fixture = TestBed.createComponent(Login);
    expect(fixture.componentInstance.i18n).toBeTruthy();
  });
});
