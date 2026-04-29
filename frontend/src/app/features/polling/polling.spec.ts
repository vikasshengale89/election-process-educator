import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { Polling } from './polling';

describe('Polling', () => {
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Polling],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Polling);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should start with empty state', () => {
    const fixture = TestBed.createComponent(Polling);
    const component = fixture.componentInstance;
    expect(component.hasSearched()).toBe(false);
    expect(component.results().length).toBe(0);
  });

  it('should not search with empty address', () => {
    const fixture = TestBed.createComponent(Polling);
    const component = fixture.componentInstance;
    component.search();
    expect(component.isSearching()).toBe(false);
  });

  it('should call API with zip code when searching', () => {
    const fixture = TestBed.createComponent(Polling);
    const component = fixture.componentInstance;
    component.searchAddress.set('123 Main St, Springfield, IL 62701');
    component.search();
    expect(component.isSearching()).toBe(true);

    const req = httpMock.expectOne((r) => r.url.includes('/api/v1/polling'));
    expect(req.request.method).toBe('GET');
    req.flush({
      success: true,
      data: {
        locations: [{ name: 'Test Location', address: '123 Test', hours: '6-7', distance: '1 mi', accessibility: ['Wheelchair'] }],
        idRequirements: { state: 'Illinois', documents: ['State ID'] },
        state: 'Illinois',
        zip: '62701'
      }
    });

    expect(component.results().length).toBe(1);
    expect(component.idDocuments().length).toBe(1);
    expect(component.stateName()).toBe('Illinois');
  });

  it('should handle typed input events', () => {
    const fixture = TestBed.createComponent(Polling);
    const component = fixture.componentInstance;
    const event = { target: { value: 'test address' } } as unknown as Event;
    component.onAddressInput(event);
    expect(component.searchAddress()).toBe('test address');
  });

  it('should render search input with accessibility', async () => {
    const fixture = TestBed.createComponent(Polling);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('#address-input');
    expect(input).toBeTruthy();
    expect(input?.getAttribute('aria-label')).toBeTruthy();
  });
});
