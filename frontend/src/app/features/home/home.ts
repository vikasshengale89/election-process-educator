import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

interface FeatureCard {
  icon: string;
  title: string;
  description: string;
  route: string;
  cta: string;
  color: string;
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
    }
  ];

  readonly stats = [
    { value: '50+', label: 'Election Terms Explained' },
    { value: '5-min', label: 'Registration Wizard' },
    { value: '100%', label: 'Free & Accessible' }
  ];
}
