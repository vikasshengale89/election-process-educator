import { TestBed } from '@angular/core/testing';
import { Timeline } from './timeline';

describe('Timeline', () => {
  let component: Timeline;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    component = TestBed.createComponent(Timeline).componentInstance;
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
});
