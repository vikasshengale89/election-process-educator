import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { I18nService } from '../../core/services/i18n.service';

interface TimelineEvent {
  readonly date: string;
  readonly title: string;
  readonly description: string;
  readonly type: 'registration' | 'voting' | 'result' | 'deadline';
  readonly daysOut: number;
}

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [TitleCasePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './timeline.html',
  styleUrl: './timeline.css'
})
export class Timeline {
  readonly i18n = inject(I18nService);
  activeFilter = signal<string>('all');

  readonly filters = ['all', 'registration', 'voting', 'deadline', 'result'];

  readonly allEvents: TimelineEvent[] = [
    { date: 'Oct 7, 2025', title: 'Voter Registration Opens', description: 'Online and mail-in voter registration portals open for the upcoming election cycle.', type: 'registration', daysOut: -90 },
    { date: 'Oct 15, 2025', title: 'Early Voting Begins', description: 'Early voting locations open. Check your local election office for specific sites and hours.', type: 'voting', daysOut: -82 },
    { date: 'Oct 22, 2025', title: 'Absentee Ballot Request Deadline', description: 'Last day to request an absentee or mail-in ballot for the upcoming election.', type: 'deadline', daysOut: -75 },
    { date: 'Nov 1, 2025', title: 'Voter Registration Deadline', description: 'Last day to register to vote (most states). Some states allow same-day registration.', type: 'registration', daysOut: -65 },
    { date: 'Nov 4, 2025', title: 'Mail Ballots Must Be Postmarked', description: 'For mail-in voters, your ballot must be postmarked by this date to be counted.', type: 'deadline', daysOut: -62 },
    { date: 'Nov 5, 2025', title: 'Election Day', description: 'Cast your ballot at your designated polling location between 6 AM and 8 PM local time. Bring your ID!', type: 'voting', daysOut: -61 },
    { date: 'Nov 6, 2025', title: 'Provisional Ballot Verification', description: 'Election officials begin verifying provisional and mail-in ballots.', type: 'result', daysOut: -60 },
    { date: 'Nov 19, 2025', title: 'Results Certified', description: 'All votes counted and results certified by the state election board.', type: 'result', daysOut: -47 },
  ];

  readonly filteredEvents = computed(() => {
    const f = this.activeFilter();
    return f === 'all' ? this.allEvents : this.allEvents.filter(e => e.type === f);
  });

  setFilter(filter: string): void {
    this.activeFilter.set(filter);
  }

  getTypeClass(type: string): string {
    return `type-${type}`;
  }

  getTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      registration: '📝 Registration',
      voting: '🗳️ Voting',
      deadline: '⏰ Deadline',
      result: '📊 Results'
    };
    return labels[type] ?? type;
  }
}
