import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Glossary } from './glossary';

describe('Glossary', () => {
  let component: Glossary;
  let fixture: ComponentFixture<Glossary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Glossary] }).compileComponents();
    fixture = TestBed.createComponent(Glossary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 16 terms', () => {
    expect(component.allTerms.length).toBe(16);
  });

  it('should show all terms by default', () => {
    expect(component.filteredTerms().length).toBe(16);
  });

  it('should filter by category', () => {
    component.setCategory('voting');
    const filtered = component.filteredTerms();
    expect(filtered.every(t => t.category === 'voting')).toBe(true);
  });

  it('should search by term name', () => {
    component.searchQuery.set('electoral');
    const filtered = component.filteredTerms();
    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.some(t => t.term.toLowerCase().includes('electoral'))).toBe(true);
  });

  it('should search by definition', () => {
    component.searchQuery.set('538 electors');
    expect(component.filteredTerms().length).toBeGreaterThan(0);
  });

  it('should return empty for no match', () => {
    component.searchQuery.set('xyznonexistent');
    expect(component.filteredTerms().length).toBe(0);
  });

  it('should sort alphabetically', () => {
    const terms = component.filteredTerms();
    for (let i = 1; i < terms.length; i++) {
      expect(terms[i].term.localeCompare(terms[i - 1].term)).toBeGreaterThanOrEqual(0);
    }
  });

  it('should update result count', () => {
    expect(component.resultCount()).toBe(16);
    component.setCategory('government');
    expect(component.resultCount()).toBeLessThan(16);
  });

  it('should handle combined filter and search', () => {
    component.setCategory('process');
    component.searchQuery.set('salamander');
    const filtered = component.filteredTerms();
    expect(filtered.length).toBe(1);
    expect(filtered[0].term).toBe('Gerrymandering');
  });

  it('should have search input with label', () => {
    const label = fixture.nativeElement.querySelector('label[for="glossary-search"]') as HTMLLabelElement | null;
    const input = fixture.nativeElement.querySelector('#glossary-search') as HTMLInputElement | null;
    expect(label?.textContent?.trim().length ?? 0).toBeGreaterThan(0);
    expect(input?.id).toBe('glossary-search');
    expect(input?.getAttribute('aria-label')).toBe(component.i18n.t('glossary.searchInputLabel'));
  });

  it('should have live region for result count', () => {
    const live = fixture.nativeElement.querySelector('#glossary-result-count') as HTMLElement | null;
    expect(live?.getAttribute('aria-live')).toBe('polite');
    expect(live?.getAttribute('aria-atomic')).toBe('true');
  });

  it('should expose glossary category buttons in a sane tab order before the grid', () => {
    fixture.detectChanges();
    const buttons = [...fixture.nativeElement.querySelectorAll('.filter-btn')].filter(
      (el): el is HTMLButtonElement => el instanceof HTMLButtonElement
    );
    buttons.forEach(b => expect(b.tabIndex).toBeLessThanOrEqual(0));
  });
});
