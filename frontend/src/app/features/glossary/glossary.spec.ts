import { TestBed } from '@angular/core/testing';
import { Glossary } from './glossary';

describe('Glossary', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Glossary]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Glossary);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show all terms by default', () => {
    const fixture = TestBed.createComponent(Glossary);
    const component = fixture.componentInstance;
    expect(component.filteredTerms().length).toBe(component.allTerms.length);
  });

  it('should filter terms by category', () => {
    const fixture = TestBed.createComponent(Glossary);
    const component = fixture.componentInstance;
    component.setCategory('voting');
    const filtered = component.filteredTerms();
    expect(filtered.every(t => t.category === 'voting')).toBe(true);
  });

  it('should filter terms by search query', () => {
    const fixture = TestBed.createComponent(Glossary);
    const component = fixture.componentInstance;
    component.searchQuery.set('ballot');
    const filtered = component.filteredTerms();
    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.every(t =>
      t.term.toLowerCase().includes('ballot') || t.definition.toLowerCase().includes('ballot')
    )).toBe(true);
  });

  it('should sort terms alphabetically', () => {
    const fixture = TestBed.createComponent(Glossary);
    const component = fixture.componentInstance;
    const terms = component.filteredTerms();
    for (let i = 1; i < terms.length; i++) {
      expect(terms[i].term.localeCompare(terms[i - 1].term)).toBeGreaterThanOrEqual(0);
    }
  });

  it('should update result count', () => {
    const fixture = TestBed.createComponent(Glossary);
    const component = fixture.componentInstance;
    const allCount = component.resultCount();
    component.searchQuery.set('electoral');
    expect(component.resultCount()).toBeLessThan(allCount);
  });

  it('should have accessible search input', async () => {
    const fixture = TestBed.createComponent(Glossary);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('#glossary-search');
    expect(input).toBeTruthy();
    expect(input?.getAttribute('type')).toBe('search');
  });
});
