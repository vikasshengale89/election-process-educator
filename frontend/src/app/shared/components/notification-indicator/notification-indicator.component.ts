import {
  Component,
  ChangeDetectionStrategy,
  computed,
  inject
} from '@angular/core';
import { NotificationService } from '../../../core/services/notification.service';
import { I18nService } from '../../../core/services/i18n.service';

@Component({
  selector: 'app-notification-indicator',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (notifications.isEnabled()) {
      <span
        class="notification-bell-wrap"
        role="status"
        tabindex="0"
        [attr.aria-label]="badgeAriaLabel()">
        <span class="bell-icon" aria-hidden="true">🔔</span>
        @if (count() > 0) {
          <span class="notification-badge" aria-hidden="true">{{ count() }}</span>
        }
      </span>
    }
  `,
  styles: `
    .notification-bell-wrap {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 2.25rem;
      height: 2.25rem;
      padding: 0 var(--space-2);
      border-radius: var(--glass-radius);
      border: 1px solid var(--glass-border);
      background: var(--glass-bg);
      cursor: default;
      color: var(--text-primary);
    }

    .notification-bell-wrap:focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 2px;
    }

    .bell-icon {
      font-size: var(--font-size-lg);
      line-height: 1;
    }

    .notification-badge {
      position: absolute;
      top: -0.35rem;
      right: -0.35rem;
      min-width: 1.1rem;
      height: 1.1rem;
      padding: 0 var(--space-1);
      border-radius: 9999px;
      background: var(--accent);
      color: var(--text-primary);
      font-size: var(--font-size-xs);
      font-weight: 700;
      line-height: 1.1rem;
      text-align: center;
    }

  `
})
export class NotificationIndicatorComponent {
  readonly notifications = inject(NotificationService);
  private readonly i18n = inject(I18nService);

  readonly count = computed(() => this.notifications.upcomingReminderCount());

  readonly badgeAriaLabel = computed(() => {
    const n = this.count();
    const template =
      n === 0
        ? this.i18n.t('notifications.indicatorNone')
        : this.i18n.t('notifications.indicatorCount');
    return template.replace('{{count}}', String(n));
  });
}
