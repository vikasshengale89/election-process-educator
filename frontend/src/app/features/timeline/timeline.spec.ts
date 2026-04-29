import { TestBed } from '@angular/core/testing';
import { Timeline } from './timeline';

describe('Timeline', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Timeline]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Timeline);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show all events by default', () => {
    const fixture = TestBed.createComponent(Timeline);
    const component = fixture.componentInstance;
    expect(component.filteredEvents().length).toBe(component.allEvents.length);
  });

  it('should filter by event type', () => {
    const fixture = TestBed.createComponent(Timeline);
    const component = fixture.componentInstance;
    component.setFilter('registration');
    const filtered = component.filteredEvents();
    expect(filtered.every(e => e.type === 'registration')).toBe(true);
    expect(filtered.length).toBeGreaterThan(0);
  });

  it('should return correct type color', () => {
    const fixture = TestBed.createComponent(Timeline);
    const component = fixture.componentInstance;
    expect(component.getTypeColor('registration')).toBe('#3b82f6');
    expect(component.getTypeColor('voting')).toBe('#10b981');
    expect(component.getTypeColor('deadline')).toBe('#ef4444');
    expect(component.getTypeColor('unknown')).toBe('#64748b');
  });

  it('should return correct type labels', () => {
    const fixture = TestBed.createComponent(Timeline);
    const component = fixture.componentInstance;
    expect(component.getTypeLabel('registration')).toContain('Registration');
    expect(component.getTypeLabel('voting')).toContain('Voting');
  });

  it('should have filter buttons with ARIA', async () => {
    const fixture = TestBed.createComponent(Timeline);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const filterGroup = compiled.querySelector('[role="group"]');
    expect(filterGroup).toBeTruthy();
  });
});
