import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Share } from './share';

describe('Share', () => {
  let component: Share;
  let fixture: ComponentFixture<Share>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Share] }).compileComponents();
    fixture = TestBed.createComponent(Share);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have share message', () => {
    expect(component.shareMessage).toBeTruthy();
    expect(component.shareMessage).toContain('vote');
  });

  it('should have correct share URL', () => {
    expect(component.shareUrl).toBe('https://election-process-educator-01.web.app');
  });

  it('should have 4 platforms', () => {
    expect(component.platforms.length).toBe(4);
  });

  it('should have twitter, facebook, linkedin, whatsapp', () => {
    const ids = component.platforms.map(p => p.id);
    expect(ids).toContain('twitter');
    expect(ids).toContain('facebook');
    expect(ids).toContain('linkedin');
    expect(ids).toContain('whatsapp');
  });

  it('should start with isCopied false', () => {
    expect(component.isCopied()).toBe(false);
  });

  it('should start with no selected platform', () => {
    expect(component.selectedPlatform()).toBeNull();
  });

  it('should open share window', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    component.shareOn('twitter');
    expect(openSpy).toHaveBeenCalled();
    expect(component.selectedPlatform()).toBe('twitter');
    openSpy.mockRestore();
  });

  it('should have platform group with aria-label', () => {
    const group = fixture.nativeElement.querySelector('.platforms-grid[role="group"]') as HTMLElement | null;
    expect(group?.getAttribute('aria-label')).toBe(component.i18n.t('share.platformGroupAria'));
  });

  it('should expose share actions in a consistent tab order', () => {
    const buttons = [...fixture.nativeElement.querySelectorAll('.platform-btn, .copy-btn')].filter(
      (el): el is HTMLButtonElement => el instanceof HTMLButtonElement
    );
    expect(buttons.length).toBeGreaterThan(0);
    buttons.forEach(b => expect(b.tabIndex).toBeLessThanOrEqual(0));
  });
});
