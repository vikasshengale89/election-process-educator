import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Home } from './home';

describe('Home', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Home);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have 6 feature cards', () => {
    const fixture = TestBed.createComponent(Home);
    expect(fixture.componentInstance.features.length).toBe(6);
  });

  it('should render hero heading', async () => {
    const fixture = TestBed.createComponent(Home);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const heading = compiled.querySelector('#hero-heading');
    expect(heading).toBeTruthy();
  });

  it('should have accessible feature cards with proper ARIA', async () => {
    const fixture = TestBed.createComponent(Home);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const featureList = compiled.querySelector('[role="list"]');
    expect(featureList).toBeTruthy();
    const items = compiled.querySelectorAll('[role="listitem"]');
    expect(items.length).toBe(6);
  });

  it('should have stats section', async () => {
    const fixture = TestBed.createComponent(Home);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const stats = compiled.querySelectorAll('.stat-card');
    expect(stats.length).toBe(3);
  });

  it('should have notification button', async () => {
    const fixture = TestBed.createComponent(Home);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const btn = compiled.querySelector('.reminders-banner button');
    expect(btn).toBeTruthy();
  });
});
