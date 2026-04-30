import { Injectable, signal, computed } from '@angular/core';

interface ElectionReminder {
  readonly id: string;
  readonly title: string;
  readonly date: string;
  readonly daysUntil: number;
  readonly type: 'registration' | 'voting' | 'deadline';
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly _isEnabled = signal(false);
  private readonly _reminders = signal<ElectionReminder[]>([]);

  readonly isEnabled = this._isEnabled.asReadonly();
  readonly reminders = this._reminders.asReadonly();

  /** Count of reminders that are today or in the future (for navbar indicator). */
  readonly upcomingReminderCount = computed(
    () => this._reminders().filter(r => r.daysUntil >= 0).length
  );

  constructor() {
    this.loadReminders();
  }

  enableNotifications(): void {
    this._isEnabled.set(true);
    this.scheduleReminders();
  }

  disableNotifications(): void {
    this._isEnabled.set(false);
  }

  private loadReminders(): void {
    const today = new Date();
    const events: ElectionReminder[] = [
      { id: '1', title: 'Voter Registration Deadline', date: '2026-10-09', daysUntil: 0, type: 'registration' },
      { id: '2', title: 'Early Voting Begins', date: '2026-10-20', daysUntil: 0, type: 'voting' },
      { id: '3', title: 'Absentee Ballot Request Deadline', date: '2026-10-27', daysUntil: 0, type: 'deadline' },
      { id: '4', title: 'Election Day', date: '2026-11-03', daysUntil: 0, type: 'voting' },
    ];

    this._reminders.set(events.map(e => ({
      ...e,
      daysUntil: Math.ceil((new Date(e.date).getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    })));
  }

  private scheduleReminders(): void {
    // Mock push notification scheduling
    // In production, this would use Firebase Cloud Messaging or Web Push API
    this._reminders().forEach(reminder => {
      if (reminder.daysUntil > 0 && reminder.daysUntil <= 7) {
        this.showNotification(reminder);
      }
    });
  }

  private showNotification(reminder: ElectionReminder): void {
    if ('Notification' in globalThis && Notification.permission === 'granted') {
      new Notification(`Election Reminder: ${reminder.title}`, {
        body: `${reminder.daysUntil} days until ${reminder.title}`,
        icon: '/assets/icons/icon-192.png'
      });
    }
  }
}
