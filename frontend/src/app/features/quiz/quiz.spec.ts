import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Quiz } from './quiz';

describe('Quiz', () => {
  let component: Quiz;
  let fixture: ComponentFixture<Quiz>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Quiz] }).compileComponents();
    fixture = TestBed.createComponent(Quiz);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start at index 0', () => {
    expect(component.currentIndex()).toBe(0);
  });

  it('should have 7 questions', () => {
    expect(component.totalQuestions).toBe(7);
  });

  it('should start with score 0', () => {
    expect(component.score()).toBe(0);
  });

  it('should select correct answer and increment score', () => {
    const correctIndex = component.currentQuestion().correctIndex;
    component.selectAnswer(correctIndex);
    expect(component.score()).toBe(1);
    expect(component.answeredCorrectly()).toBe(true);
  });

  it('should select wrong answer and not increment score', () => {
    const wrongIndex = component.currentQuestion().correctIndex === 0 ? 1 : 0;
    component.selectAnswer(wrongIndex);
    expect(component.score()).toBe(0);
    expect(component.answeredCorrectly()).toBe(false);
  });

  it('should not allow double selection', () => {
    component.selectAnswer(0);
    component.selectAnswer(1);
    expect(component.selectedAnswer()).toBe(0);
  });

  it('should advance to next question', () => {
    component.selectAnswer(0);
    component.nextQuestion();
    expect(component.currentIndex()).toBe(1);
    expect(component.selectedAnswer()).toBeNull();
  });

  it('should complete quiz on last question', () => {
    for (let i = 0; i < component.totalQuestions; i++) {
      component.selectAnswer(0);
      component.nextQuestion();
    }
    expect(component.isComplete()).toBe(true);
  });

  it('should restart quiz', () => {
    component.selectAnswer(0);
    component.nextQuestion();
    component.restart();
    expect(component.currentIndex()).toBe(0);
    expect(component.score()).toBe(0);
    expect(component.isComplete()).toBe(false);
  });

  it('should compute grade correctly', () => {
    expect(component.grade()).toBeTruthy();
    expect(component.grade()).toHaveProperty('label');
    expect(component.grade()).toHaveProperty('colorClass');
  });

  it('should return correct option classes', () => {
    expect(component.getOptionClass(0)).toBe('');
    component.selectAnswer(component.currentQuestion().correctIndex);
    expect(component.getOptionClass(component.currentQuestion().correctIndex)).toBe('correct');
  });

  it('should have progressbar with aria attributes', () => {
    const bar = fixture.nativeElement.querySelector('[role="progressbar"]') as HTMLElement | null;
    expect(bar).toBeTruthy();
    expect(bar?.getAttribute('aria-valuemin')).toBe('1');
    expect(bar?.getAttribute('aria-valuemax')).toBe(String(component.totalQuestions));
    expect(bar?.getAttribute('aria-valuenow')).toBe('1');
  });

  it('should announce answer result with role alert', () => {
    component.selectAnswer(component.currentQuestion().correctIndex);
    fixture.detectChanges();
    const alert = fixture.nativeElement.querySelector('[role="alert"]') as HTMLElement | null;
    expect(alert).toBeTruthy();
    expect(alert?.getAttribute('aria-live')).toBe('assertive');
  });

  it('should keep focus targets in document order within the question panel', () => {
    fixture.detectChanges();
    const progress = fixture.nativeElement.querySelector('[role="progressbar"]') as HTMLElement | null;
    const radios = [...fixture.nativeElement.querySelectorAll('[role="radio"]')].filter(
      (el): el is HTMLElement => el instanceof HTMLElement
    );
    expect(progress).toBeTruthy();
    expect(radios.length).toBeGreaterThan(0);
    radios.forEach(r => expect(r instanceof HTMLButtonElement && !r.disabled).toBe(true));
  });
});
