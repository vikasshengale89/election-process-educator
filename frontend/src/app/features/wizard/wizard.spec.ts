import { TestBed } from '@angular/core/testing';
import { Wizard } from './wizard';

describe('Wizard', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Wizard]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Wizard);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should start at step 0', () => {
    const fixture = TestBed.createComponent(Wizard);
    expect(fixture.componentInstance.currentStep()).toBe(0);
  });

  it('should have 4 steps', () => {
    const fixture = TestBed.createComponent(Wizard);
    expect(fixture.componentInstance.totalSteps).toBe(4);
  });

  it('should advance step when option selected', () => {
    const fixture = TestBed.createComponent(Wizard);
    const component = fixture.componentInstance;
    component.selectOption('voterStatus', 'first');
    expect(component.currentStep()).toBe(1);
  });

  it('should go back to previous step', () => {
    const fixture = TestBed.createComponent(Wizard);
    const component = fixture.componentInstance;
    component.selectOption('voterStatus', 'first');
    component.goBack();
    expect(component.currentStep()).toBe(0);
  });

  it('should complete after all steps answered', () => {
    const fixture = TestBed.createComponent(Wizard);
    const component = fixture.componentInstance;
    component.selectOption('voterStatus', 'first');
    component.selectOption('method', 'mail');
    component.selectOption('id', 'dl');
    component.selectOption('address', 'current');
    expect(component.isComplete()).toBe(true);
  });

  it('should generate personalized checklist', () => {
    const fixture = TestBed.createComponent(Wizard);
    const component = fixture.componentInstance;
    component.selectOption('voterStatus', 'first');
    component.selectOption('method', 'mail');
    component.selectOption('id', 'none');
    component.selectOption('address', 'moved');
    const checklist = component.checklist();
    expect(checklist.length).toBeGreaterThan(3);
  });

  it('should restart wizard', () => {
    const fixture = TestBed.createComponent(Wizard);
    const component = fixture.componentInstance;
    component.selectOption('voterStatus', 'first');
    component.restart();
    expect(component.currentStep()).toBe(0);
    expect(component.isComplete()).toBe(false);
  });

  it('should have progress bar with ARIA attributes', async () => {
    const fixture = TestBed.createComponent(Wizard);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const progressbar = compiled.querySelector('[role="progressbar"]');
    expect(progressbar).toBeTruthy();
    expect(progressbar?.getAttribute('aria-valuemin')).toBe('0');
    expect(progressbar?.getAttribute('aria-valuemax')).toBe('100');
  });
});
