import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Wizard } from './wizard';

describe('Wizard', () => {
  let component: Wizard;
  let fixture: ComponentFixture<Wizard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Wizard] }).compileComponents();
    fixture = TestBed.createComponent(Wizard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start at step 0', () => {
    expect(component.currentStep()).toBe(0);
  });

  it('should have 4 steps', () => {
    expect(component.totalSteps).toBe(4);
  });

  it('should compute progress correctly', () => {
    expect(component.progress()).toBe(0);
  });

  it('should advance step on option select', () => {
    component.selectOption('voterStatus', 'first');
    expect(component.currentStep()).toBe(1);
  });

  it('should go back', () => {
    component.selectOption('voterStatus', 'first');
    component.goBack();
    expect(component.currentStep()).toBe(0);
  });

  it('should not go back past 0', () => {
    component.goBack();
    expect(component.currentStep()).toBe(0);
  });

  it('should complete after all steps', () => {
    component.selectOption('voterStatus', 'first');
    component.selectOption('method', 'mail');
    component.selectOption('id', 'dl');
    component.selectOption('address', 'current');
    expect(component.isComplete()).toBe(true);
  });

  it('should generate checklist', () => {
    component.selectOption('voterStatus', 'first');
    component.selectOption('method', 'mail');
    component.selectOption('id', 'none');
    component.selectOption('address', 'moved');
    const list = component.checklist();
    expect(list.length).toBeGreaterThan(2);
  });

  it('should restart', () => {
    component.selectOption('voterStatus', 'first');
    component.restart();
    expect(component.currentStep()).toBe(0);
    expect(component.isComplete()).toBe(false);
    expect(Object.keys(component.answers()).length).toBe(0);
  });

  it('should return correct answer keys', () => {
    expect(component.getAnswerKey(0)).toBe('voterStatus');
    expect(component.getAnswerKey(1)).toBe('method');
    expect(component.getAnswerKey(2)).toBe('id');
    expect(component.getAnswerKey(3)).toBe('address');
  });

  it('should have progressbar with aria attributes', () => {
    fixture.detectChanges();
    const bar = fixture.nativeElement.querySelector('[role="progressbar"]') as HTMLElement | null;
    expect(bar).toBeTruthy();
    expect(bar?.getAttribute('aria-valuemin')).toBe('0');
    expect(bar?.getAttribute('aria-valuemax')).toBe('100');
    expect(bar?.getAttribute('aria-valuenow')).toBe('0');
    expect(bar?.getAttribute('aria-label')).toContain('Step');
  });

  it('should have radio group for options', () => {
    const group = fixture.nativeElement.querySelector('[role="radiogroup"]') as HTMLElement | null;
    expect(group).toBeTruthy();
    const radios = fixture.nativeElement.querySelectorAll('[role="radio"]');
    expect(radios.length).toBe(component.currentStepData().options.length);
  });

  it('should use a logical tabindex order for wizard actions before completion', () => {
    fixture.detectChanges();
    const radios = [...fixture.nativeElement.querySelectorAll('[role="radio"]')].filter(
      (el): el is HTMLElement => el instanceof HTMLElement
    );
    const tabbable = radios.filter(el => !el.hasAttribute('disabled'));
    tabbable.forEach(el => expect(el.tabIndex).toBeLessThanOrEqual(0));
  });
});
