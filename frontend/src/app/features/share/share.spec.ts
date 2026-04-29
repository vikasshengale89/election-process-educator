import { TestBed } from '@angular/core/testing';
import { Share } from './share';

describe('Share', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Share]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Share);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have platforms defined', () => {
    const fixture = TestBed.createComponent(Share);
    expect(fixture.componentInstance.platforms.length).toBe(4);
  });

  it('should have a share message', () => {
    const fixture = TestBed.createComponent(Share);
    expect(fixture.componentInstance.shareMessage.length).toBeGreaterThan(0);
  });

  it('should have a share URL', () => {
    const fixture = TestBed.createComponent(Share);
    expect(fixture.componentInstance.shareUrl).toContain('https://');
  });

  it('should have copy link button', async () => {
    const fixture = TestBed.createComponent(Share);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const copyBtn = compiled.querySelector('.copy-btn');
    expect(copyBtn).toBeTruthy();
  });

  it('should display voter readiness checklist', async () => {
    const fixture = TestBed.createComponent(Share);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.querySelectorAll('.status-list li');
    expect(items.length).toBe(5);
  });
});
