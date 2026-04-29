import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { I18nService } from '../../core/services/i18n.service';

interface WizardStep {
  id: number;
  title: string;
  question: string;
  options: { label: string; value: string; icon: string }[];
}

@Component({
  selector: 'app-wizard',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './wizard.html',
  styleUrl: './wizard.css'
})
export class Wizard {
  readonly i18n = inject(I18nService);
  currentStep = signal(0);
  answers = signal<Record<string, string>>({});
  isComplete = signal(false);

  readonly steps: WizardStep[] = [
    {
      id: 0,
      title: 'Voter Status',
      question: 'Are you a first-time voter?',
      options: [
        { label: 'Yes, first time!', value: 'first', icon: '🌟' },
        { label: 'I have voted before', value: 'returning', icon: '✅' },
        { label: 'I need to re-register', value: 'rereg', icon: '🔄' }
      ]
    },
    {
      id: 1,
      title: 'Voting Method',
      question: 'How do you plan to vote?',
      options: [
        { label: 'In-person on Election Day', value: 'in-person', icon: '🏛️' },
        { label: 'Mail-in / Absentee Ballot', value: 'mail', icon: '📬' },
        { label: 'Early Voting', value: 'early', icon: '📅' }
      ]
    },
    {
      id: 2,
      title: 'ID Requirements',
      question: 'Do you have a government-issued ID?',
      options: [
        { label: "Yes, I have a Driver's License", value: 'dl', icon: '🪪' },
        { label: 'Yes, I have a Passport', value: 'passport', icon: '🛂' },
        { label: 'No, I need alternatives', value: 'none', icon: '❓' }
      ]
    },
    {
      id: 3,
      title: 'Registration',
      question: 'Is your registration address current?',
      options: [
        { label: 'Yes, all up to date', value: 'current', icon: '✅' },
        { label: 'I recently moved', value: 'moved', icon: '🏠' },
        { label: "I'm not sure", value: 'unsure', icon: '🤔' }
      ]
    }
  ];

  readonly totalSteps = this.steps.length;
  readonly progress = computed(() => Math.round((this.currentStep() / this.totalSteps) * 100));
  readonly currentStepData = computed(() => this.steps[this.currentStep()]);

  readonly checklist = computed(() => {
    const ans = this.answers();
    const items: string[] = [
      '✅ Check your voter registration status at vote.gov',
      '✅ Find your polling location using your zip code',
    ];
    if (ans['voterStatus'] === 'first' || ans['voterStatus'] === 'rereg') {
      items.push('📝 Register at least 15 days before the election');
    }
    if (ans['method'] === 'mail') {
      items.push('📬 Request your mail-in ballot at least 7 days before election day');
    }
    if (ans['id'] === 'none') {
      items.push('⚠️ Contact your local election office for ID alternatives (affidavit, utility bill, etc.)');
    }
    if (ans['address'] === 'moved') {
      items.push('🏠 Update your voter registration with your new address');
    }
    items.push('🗓️ Mark Election Day in your calendar — it\'s a civic holiday!');
    return items;
  });

  selectOption(key: string, value: string): void {
    this.answers.update(prev => ({ ...prev, [key]: value }));
    if (this.currentStep() < this.totalSteps - 1) {
      this.currentStep.update(s => s + 1);
    } else {
      this.isComplete.set(true);
    }
  }

  getAnswerKey(step: number): string {
    const keys = ['voterStatus', 'method', 'id', 'address'];
    return keys[step] ?? 'unknown';
  }

  goBack(): void {
    if (this.currentStep() > 0) {
      this.currentStep.update(s => s - 1);
      this.isComplete.set(false);
    }
  }

  restart(): void {
    this.currentStep.set(0);
    this.answers.set({});
    this.isComplete.set(false);
  }
}
