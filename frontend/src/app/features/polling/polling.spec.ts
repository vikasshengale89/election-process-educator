import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { Polling } from './polling';

describe('Polling', () => {
  let component: Polling;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    component = TestBed.createComponent(Polling).componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with empty address', () => {
    expect(component.searchAddress()).toBe('');
  });

  it('should start with no results', () => {
    expect(component.results().length).toBe(0);
    expect(component.hasSearched()).toBe(false);
  });

  it('should not search with empty address', () => {
    component.search();
    expect(component.isSearching()).toBe(false);
  });

  it('should update search address', () => {
    const mockEvent = { target: { value: '123 Main St 62701' } } as unknown as Event;
    component.onAddressInput(mockEvent);
    expect(component.searchAddress()).toBe('123 Main St 62701');
  });

  it('should search and receive results', () => {
    component.searchAddress.set('123 Main St 62701');
    component.search();

    const req = httpMock.expectOne((r) => r.url.includes('/api/v1/polling'));
    expect(req.request.method).toBe('GET');
    req.flush({
      success: true,
      data: {
        locations: [{ name: 'Test Location', address: '123 Test', hours: '6AM-7PM', distance: '0.5mi', accessibility: [] }],
        idRequirements: { state: 'Illinois', documents: ['Photo ID'] },
        state: 'Illinois',
        zip: '62701'
      }
    });

    expect(component.results().length).toBe(1);
    expect(component.stateName()).toBe('Illinois');
    expect(component.hasSearched()).toBe(true);
  });

  it('should handle search error', () => {
    component.searchAddress.set('invalid address');
    component.search();

    const req = httpMock.expectOne((r) => r.url.includes('/api/v1/polling'));
    req.error(new ProgressEvent('error'));

    expect(component.results().length).toBe(0);
    expect(component.hasSearched()).toBe(true);
  });
});
