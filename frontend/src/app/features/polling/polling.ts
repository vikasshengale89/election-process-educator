import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { I18nService } from '../../core/services/i18n.service';

interface PollingLocation {
  name: string;
  address: string;
  hours: string;
  distance: string;
  accessibility: string[];
}

@Component({
  selector: 'app-polling',
  standalone: true,
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './polling.html',
  styleUrl: './polling.css'
})
export class Polling {
  readonly i18n = inject(I18nService);

  searchAddress = signal('');
  isSearching = signal(false);
  hasSearched = signal(false);
  results = signal<PollingLocation[]>([]);
  idDocuments = signal<string[]>([]);

  search(): void {
    const address = this.searchAddress().trim();
    if (!address) return;

    this.isSearching.set(true);
    this.hasSearched.set(false);

    // Simulate API call with mock data
    setTimeout(() => {
      this.results.set([
        {
          name: 'Community Center - Precinct 42',
          address: '123 Democracy Lane, Springfield, IL 62701',
          hours: '6:00 AM - 7:00 PM',
          distance: '0.8 miles',
          accessibility: ['Wheelchair accessible', 'Curbside voting available', 'ASL interpreter on request']
        },
        {
          name: 'Lincoln Elementary School - Gym',
          address: '456 Liberty Ave, Springfield, IL 62702',
          hours: '6:00 AM - 7:00 PM',
          distance: '1.2 miles',
          accessibility: ['Wheelchair accessible', 'Parking available']
        },
        {
          name: 'First Baptist Church - Fellowship Hall',
          address: '789 Freedom Blvd, Springfield, IL 62703',
          hours: '6:00 AM - 8:00 PM',
          distance: '2.1 miles',
          accessibility: ['Wheelchair accessible', 'Audio assistance available']
        }
      ]);

      this.idDocuments.set([
        'Valid state-issued photo ID (Driver\'s License or State ID)',
        'US Passport or Passport Card',
        'Military ID',
        'Student ID from an Illinois university',
        'Utility bill, bank statement, or government document showing name and address (within 30 days)'
      ]);

      this.isSearching.set(false);
      this.hasSearched.set(true);
    }, 1200);
  }
}
