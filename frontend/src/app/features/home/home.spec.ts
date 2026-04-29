import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Home } from './home';

describe('Home', () => {
  let component: Home;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([])]
    });
    component = TestBed.createComponent(Home).componentInstance;
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
});
