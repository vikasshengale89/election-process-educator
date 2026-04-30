import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Home } from './home';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideRouter([])]
    }).compileComponents();
    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 6 feature cards', () => {
    expect(component.features.length).toBe(6);
  });

  it('should have 3 stats', () => {
    expect(component.stats.length).toBe(3);
  });

  it('should have features with required properties', () => {
    component.features.forEach(f => {
      expect(f).toHaveProperty('icon');
      expect(f).toHaveProperty('title');
      expect(f).toHaveProperty('route');
      expect(f).toHaveProperty('colorClass');
    });
  });

  it('should include polling and share features', () => {
    const routes = component.features.map(f => f.route);
    expect(routes).toContain('/polling');
    expect(routes).toContain('/share');
  });

  it('should enable reminders', () => {
    component.enableReminders();
    expect(component.notifications.isEnabled()).toBe(true);
  });

  it('should have hero section with heading', () => {
    const hero = fixture.nativeElement.querySelector('section.hero') as HTMLElement | null;
    const h1 = fixture.nativeElement.querySelector('#hero-heading') as HTMLElement | null;
    expect(hero).toBeTruthy();
    expect(h1).toBeTruthy();
    expect(h1?.id).toBe('hero-heading');
  });

  it('should have features grid with role list', () => {
    const grid = fixture.nativeElement.querySelector('.features-grid[role="list"]') as HTMLElement | null;
    expect(grid).toBeTruthy();
    const items = fixture.nativeElement.querySelectorAll('.features-grid [role="listitem"]');
    expect(items.length).toBeGreaterThanOrEqual(component.features.length);
  });

  it('should prioritize primary navigation links before reminders in markup order', () => {
    const heroLinks = [...fixture.nativeElement.querySelectorAll('.hero-actions a')].filter(
      (el): el is HTMLElement => el instanceof HTMLElement
    );
    const reminders = [...fixture.nativeElement.querySelectorAll('.reminders-banner button')].filter(
      (el): el is HTMLElement => el instanceof HTMLElement
    );
    heroLinks.forEach(a => expect(a.tabIndex).toBeLessThanOrEqual(0));
    reminders.forEach(b => expect(b.tabIndex).toBeLessThanOrEqual(0));
  });
});
