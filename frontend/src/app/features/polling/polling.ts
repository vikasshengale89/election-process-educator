import { Component, ChangeDetectionStrategy, signal, inject, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { I18nService } from '../../core/services/i18n.service';
import { AnalyticsService } from '../../core/services/analytics.service';

interface PollingLocation {
  readonly name: string;
  readonly address: string;
  readonly hours: string;
  readonly distance: string;
  readonly accessibility: string[];
}

interface PollingResponse {
  readonly success: boolean;
  readonly data: {
    readonly locations: PollingLocation[];
    readonly idRequirements: { readonly state: string; readonly documents: string[] };
    readonly state: string;
    readonly zip: string;
  };
}

@Component({
  selector: 'app-polling',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './polling.html',
  styleUrl: './polling.css'
})
export class Polling {
  readonly i18n = inject(I18nService);
  private readonly http = inject(HttpClient);
  private readonly analytics = inject(AnalyticsService);

  searchAddress = signal('');
  isSearching = signal(false);
  hasSearched = signal(false);
  results = signal<PollingLocation[]>([]);
  idDocuments = signal<string[]>([]);
  stateName = signal('');

  readonly searchLiveAnnouncement = computed(() => {
    if (!this.hasSearched()) {
      return '';
    }
    const n = this.results().length;
    if (n === 0) {
      return this.i18n.t('polling.searchAnnouncementNone');
    }
    return this.i18n
      .t('polling.searchAnnouncementFound')
      .replace('{{count}}', String(n));
  });

  onAddressInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchAddress.set(target.value);
  }

  search(): void {
    const address = this.searchAddress().trim();
    if (!address) return;

    this.analytics.trackPollingSearch();

    this.isSearching.set(true);
    this.hasSearched.set(false);

    const zipMatch = address.match(/\d{5}/);
    const zip = zipMatch ? zipMatch[0] : '62701';

    this.http.get<PollingResponse>(`/api/v1/polling?zip=${zip}&address=${encodeURIComponent(address)}`)
      .subscribe({
        next: (response) => {
          this.results.set(response.data.locations);
          this.idDocuments.set(response.data.idRequirements.documents);
          this.stateName.set(response.data.state);
          this.isSearching.set(false);
          this.hasSearched.set(true);
        },
        error: () => {
          this.results.set([]);
          this.idDocuments.set([]);
          this.isSearching.set(false);
          this.hasSearched.set(true);
        }
      });
  }
}
