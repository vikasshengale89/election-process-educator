import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './quiz.html',
  styleUrl: './quiz.css'
})
export class Quiz {
  currentIndex = signal(0);
  selectedAnswer = signal<number | null>(null);
  score = signal(0);
  isComplete = signal(false);
  answeredCorrectly = signal<boolean | null>(null);

  readonly questions: QuizQuestion[] = [
    {
      id: 1,
      question: 'What is the minimum voting age in the United States?',
      options: ['16', '17', '18', '21'],
      correctIndex: 2,
      explanation: 'The 26th Amendment (ratified 1971) lowered the voting age to 18 for all federal, state, and local elections.'
    },
    {
      id: 2,
      question: 'What does the Electoral College do?',
      options: [
        'Runs college elections on campus',
        'Formally elects the President and Vice President',
        'Certifies Congressional election results',
        'Manages voter registration databases'
      ],
      correctIndex: 1,
      explanation: 'The Electoral College is a body of 538 electors who formally cast votes to elect the President and Vice President based on each state\'s popular vote.'
    },
    {
      id: 3,
      question: 'Which amendment gave women the right to vote?',
      options: ['13th Amendment', '15th Amendment', '19th Amendment', '24th Amendment'],
      correctIndex: 2,
      explanation: 'The 19th Amendment, ratified in 1920, prohibits denying the right to vote on account of sex.'
    },
    {
      id: 4,
      question: 'What is a primary election?',
      options: [
        'The most important election of the year',
        'An election to pick a school\'s student body president',
        'A preliminary election to choose party candidates for the general election',
        'The first round of a presidential election'
      ],
      correctIndex: 2,
      explanation: 'A primary election allows registered party members to vote for which candidate will represent their party in the general election.'
    },
    {
      id: 5,
      question: 'What is gerrymandering?',
      options: [
        'Campaigning at a polling place',
        'Manipulating district boundaries to favor a party',
        'A type of absentee ballot',
        'The process of recounting votes'
      ],
      correctIndex: 1,
      explanation: 'Gerrymandering is the manipulation of electoral district boundaries to give one party a political advantage. It\'s named after Governor Elbridge Gerry.'
    },
    {
      id: 6,
      question: 'What is a provisional ballot?',
      options: [
        'A ballot cast by provisional residents only',
        'A special ballot for overseas military voters',
        'A ballot cast when eligibility is in question, counted after verification',
        'An early voting ballot submitted by mail'
      ],
      correctIndex: 2,
      explanation: 'A provisional ballot is issued when there\'s a question about a voter\'s eligibility. Election officials verify the voter\'s registration before counting it.'
    },
    {
      id: 7,
      question: 'How many electoral votes does a candidate need to win the presidency?',
      options: ['218', '270', '300', '538'],
      correctIndex: 1,
      explanation: 'A candidate needs at least 270 of 538 total electoral votes to win the presidency — a majority of the Electoral College.'
    },
  ];

  readonly totalQuestions = this.questions.length;
  readonly currentQuestion = computed(() => this.questions[this.currentIndex()]);
  readonly progressPct = computed(() => Math.round((this.currentIndex() / this.totalQuestions) * 100));
  readonly scorePercent = computed(() => Math.round((this.score() / this.totalQuestions) * 100));

  readonly grade = computed(() => {
    const pct = this.scorePercent();
    if (pct >= 90) return { label: 'Democracy Champion! 🏆', color: '#10b981' };
    if (pct >= 70) return { label: 'Informed Voter! 🎉', color: '#3b82f6' };
    if (pct >= 50) return { label: 'Getting There! 📚', color: '#f59e0b' };
    return { label: 'Keep Learning! 💪', color: '#ef4444' };
  });

  selectAnswer(index: number): void {
    if (this.selectedAnswer() !== null) return; // already answered
    this.selectedAnswer.set(index);
    const correct = index === this.currentQuestion().correctIndex;
    this.answeredCorrectly.set(correct);
    if (correct) this.score.update(s => s + 1);
  }

  nextQuestion(): void {
    if (this.currentIndex() < this.totalQuestions - 1) {
      this.currentIndex.update(i => i + 1);
      this.selectedAnswer.set(null);
      this.answeredCorrectly.set(null);
    } else {
      this.isComplete.set(true);
    }
  }

  restart(): void {
    this.currentIndex.set(0);
    this.selectedAnswer.set(null);
    this.score.set(0);
    this.isComplete.set(false);
    this.answeredCorrectly.set(null);
  }

  getOptionClass(index: number): string {
    const selected = this.selectedAnswer();
    if (selected === null) return '';
    if (index === this.currentQuestion().correctIndex) return 'correct';
    if (index === selected) return 'wrong';
    return 'dimmed';
  }
}
