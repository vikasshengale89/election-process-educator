import { TestBed } from '@angular/core/testing';
import { Polling } from './polling';

describe('Polling', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Polling]
    }).compileComponents();
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

  it('should set searching state when address provided', () => {
    const fixture = TestBed.createComponent(Polling);
    const component = fixture.componentInstance;
    component.searchAddress.set('123 Main St, Springfield, IL');
    component.search();
    expect(component.isSearching()).toBe(true);
  });

  it('should return results after search completes', async () => {
    const fixture = TestBed.createComponent(Polling);
    const component = fixture.componentInstance;
    component.searchAddress.set('123 Main St, Springfield, IL');
    component.search();

    await new Promise(resolve => setTimeout(resolve, 1500));

    expect(component.hasSearched()).toBe(true);
    expect(component.results().length).toBe(3);
    expect(component.idDocuments().length).toBeGreaterThan(0);
  });

  it('should have accessibility info in results', async () => {
    const fixture = TestBed.createComponent(Polling);
    const component = fixture.componentInstance;
    component.searchAddress.set('123 Main St');
    component.search();

    await new Promise(resolve => setTimeout(resolve, 1500));

    const results = component.results();
    expect(results[0].accessibility.length).toBeGreaterThan(0);
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
