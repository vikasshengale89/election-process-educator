import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/services/i18n.service';
import { NotificationService } from '../../core/services/notification.service';

interface FeatureCard {
  readonly icon: string;
  readonly title: string;
  readonly description: string;
  readonly route: string;
  readonly cta: string;
  readonly color: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  readonly i18n = inject(I18nService);
  readonly notifications = inject(NotificationService);

  readonly features: FeatureCard[] = [
    {
      icon: '📋',
      title: 'Voter Wizard',
      description: 'Step-by-step personalized guide through the registration process tailored to your situation.',
      route: '/wizard',
      cta: 'Start Wizard',
      color: '#3b82f6'
    },
    {
      icon: '📅',
      title: 'Election Timeline',
      description: 'Interactive timeline of key election dates, deadlines, and milestones for your location.',
      route: '/timeline',
      cta: 'View Timeline',
      color: '#8b5cf6'
    },
    {
      icon: '📖',
      title: 'Glossary',
      description: 'Plain-language explanations of complex election jargon — no law degree required.',
      route: '/glossary',
      cta: 'Explore Terms',
      color: '#06b6d4'
    },
    {
      icon: '🧠',
      title: 'Knowledge Quiz',
      description: 'Test your election knowledge and see how ready you are for the ballot box.',
      route: '/quiz',
      cta: 'Take the Quiz',
      color: '#10b981'
    },
    {
      icon: '📍',
      title: 'Polling Locations',
      description: 'Find your nearest polling location, operating hours, and required ID documents.',
      route: '/polling',
      cta: 'Find Location',
      color: '#f59e0b'
    },
    {
      icon: '📢',
      title: 'Share Readiness',
      description: 'Let your friends and family know you are ready to vote — spread the word!',
      route: '/share',
      cta: 'Share Status',
      color: '#ec4899'
    }
  ];

  readonly stats = [
    { value: '50+', label: 'Election Terms Explained' },
    { value: '5-min', label: 'Registration Wizard' },
    { value: '100%', label: 'Free & Accessible' }
  ];

  enableReminders(): void {
    this.notifications.enableNotifications();
  }
}
