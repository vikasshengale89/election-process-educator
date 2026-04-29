import { TestBed } from '@angular/core/testing';
import { Glossary } from './glossary';

describe('Glossary', () => {
  let component: Glossary;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    component = TestBed.createComponent(Glossary).componentInstance;
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
});
