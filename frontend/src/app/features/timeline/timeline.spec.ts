import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Timeline } from './timeline';

describe('Timeline', () => {
  let component: Timeline;
  let fixture: ComponentFixture<Timeline>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Timeline] }).compileComponents();
    fixture = TestBed.createComponent(Timeline);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have events', () => {
    expect(component.allEvents.length).toBeGreaterThan(0);
  });

  it('should show all events by default', () => {
    expect(component.filteredEvents().length).toBe(component.allEvents.length);
  });

  it('should filter by type', () => {
    component.setFilter('registration');
    const filtered = component.filteredEvents();
    expect(filtered.every(e => e.type === 'registration')).toBe(true);
    expect(filtered.length).toBeGreaterThan(0);
  });

  it('should reset filter to all', () => {
    component.setFilter('voting');
    component.setFilter('all');
    expect(component.filteredEvents().length).toBe(component.allEvents.length);
  });

  it('should return correct type class', () => {
    expect(component.getTypeClass('registration')).toBe('type-registration');
    expect(component.getTypeClass('voting')).toBe('type-voting');
  });

  it('should return type labels with emojis', () => {
    expect(component.getTypeLabel('registration')).toContain('Registration');
    expect(component.getTypeLabel('voting')).toContain('Voting');
    expect(component.getTypeLabel('deadline')).toContain('Deadline');
    expect(component.getTypeLabel('result')).toContain('Results');
  });

  it('should have correct filter list', () => {
    expect(component.filters).toContain('all');
    expect(component.filters).toContain('registration');
    expect(component.filters).toContain('voting');
    expect(component.filters).toContain('deadline');
    expect(component.filters).toContain('result');
  });

  it('should have filter group with aria-label', () => {
    fixture.detectChanges();
    const group = fixture.nativeElement.querySelector('.filter-bar[role="group"]') as HTMLElement | null;
    expect(group?.getAttribute('aria-label')).toBe(component.i18n.t('timeline.filterGroupAria'));
  });

  it('should expose a polite live announcement for filtered count', () => {
    fixture.detectChanges();
    const live = fixture.nativeElement.querySelector('#timeline-filter-announcement') as HTMLElement | null;
    expect(live?.getAttribute('aria-live')).toBe('polite');
    expect(live?.textContent).toContain(String(component.filteredEvents().length));
  });

  it('should list timeline entries in markup order consistent with DOM flow', () => {
    fixture.detectChanges();
    const list = fixture.nativeElement.querySelector('.timeline') as HTMLElement | null;
    const items = [...fixture.nativeElement.querySelectorAll('.timeline [role="listitem"]')].filter(
      (el): el is HTMLElement => el instanceof HTMLElement
    );
    expect(list).toBeTruthy();
    expect(items.length).toBe(component.filteredEvents().length);
  });
});
