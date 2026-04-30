import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with notifications disabled', () => {
    expect(service.isEnabled()).toBe(false);
  });

  it('should have reminders loaded', () => {
    expect(service.reminders().length).toBeGreaterThan(0);
  });

  it('should expose upcoming reminder count', () => {
    expect(service.upcomingReminderCount()).toBeGreaterThanOrEqual(0);
    expect(service.upcomingReminderCount()).toBeLessThanOrEqual(service.reminders().length);
  });

  it('should enable notifications', () => {
    service.enableNotifications();
    expect(service.isEnabled()).toBe(true);
  });

  it('should disable notifications', () => {
    service.enableNotifications();
    service.disableNotifications();
    expect(service.isEnabled()).toBe(false);
  });

  it('should have reminders with correct structure', () => {
    const reminder = service.reminders()[0];
    expect(reminder).toHaveProperty('id');
    expect(reminder).toHaveProperty('title');
    expect(reminder).toHaveProperty('date');
    expect(reminder).toHaveProperty('type');
  });
});
