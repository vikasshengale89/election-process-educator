import { TestBed } from '@angular/core/testing';
import { Quiz } from './quiz';

describe('Quiz', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Quiz]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Quiz);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should start at question 0', () => {
    const fixture = TestBed.createComponent(Quiz);
    expect(fixture.componentInstance.currentIndex()).toBe(0);
  });

  it('should have 7 questions', () => {
    const fixture = TestBed.createComponent(Quiz);
    expect(fixture.componentInstance.totalQuestions).toBe(7);
  });

  it('should increment score on correct answer', () => {
    const fixture = TestBed.createComponent(Quiz);
    const component = fixture.componentInstance;
    const correctIndex = component.questions[0].correctIndex;
    component.selectAnswer(correctIndex);
    expect(component.score()).toBe(1);
  });

  it('should not increment score on wrong answer', () => {
    const fixture = TestBed.createComponent(Quiz);
    const component = fixture.componentInstance;
    const wrongIndex = component.questions[0].correctIndex === 0 ? 1 : 0;
    component.selectAnswer(wrongIndex);
    expect(component.score()).toBe(0);
  });

  it('should not allow multiple answers per question', () => {
    const fixture = TestBed.createComponent(Quiz);
    const component = fixture.componentInstance;
    component.selectAnswer(0);
    component.selectAnswer(1);
    expect(component.selectedAnswer()).toBe(0);
  });

  it('should advance to next question', () => {
    const fixture = TestBed.createComponent(Quiz);
    const component = fixture.componentInstance;
    component.selectAnswer(0);
    component.nextQuestion();
    expect(component.currentIndex()).toBe(1);
    expect(component.selectedAnswer()).toBeNull();
  });

  it('should complete after last question', () => {
    const fixture = TestBed.createComponent(Quiz);
    const component = fixture.componentInstance;
    for (let i = 0; i < component.totalQuestions; i++) {
      component.selectAnswer(component.questions[i].correctIndex);
      component.nextQuestion();
    }
    expect(component.isComplete()).toBe(true);
  });

  it('should calculate score percentage', () => {
    const fixture = TestBed.createComponent(Quiz);
    const component = fixture.componentInstance;
    component.selectAnswer(component.questions[0].correctIndex);
    component.nextQuestion();
    component.selectAnswer(component.questions[1].correctIndex);
    expect(component.scorePercent()).toBeGreaterThan(0);
  });

  it('should restart quiz', () => {
    const fixture = TestBed.createComponent(Quiz);
    const component = fixture.componentInstance;
    component.selectAnswer(0);
    component.nextQuestion();
    component.restart();
    expect(component.currentIndex()).toBe(0);
    expect(component.score()).toBe(0);
    expect(component.isComplete()).toBe(false);
  });

  it('should assign grade based on score', () => {
    const fixture = TestBed.createComponent(Quiz);
    const component = fixture.componentInstance;
    for (let i = 0; i < component.totalQuestions; i++) {
      component.selectAnswer(component.questions[i].correctIndex);
      component.nextQuestion();
    }
    expect(component.grade().label).toContain('Champion');
  });
});
