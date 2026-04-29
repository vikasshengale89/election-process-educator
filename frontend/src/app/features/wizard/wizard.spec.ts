import { TestBed } from '@angular/core/testing';
import { Wizard } from './wizard';

describe('Wizard', () => {
  let component: Wizard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    component = TestBed.createComponent(Wizard).componentInstance;
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
});
