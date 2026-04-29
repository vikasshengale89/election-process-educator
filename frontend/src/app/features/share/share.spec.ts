import { TestBed } from '@angular/core/testing';
import { Share } from './share';

describe('Share', () => {
  let component: Share;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    component = TestBed.createComponent(Share).componentInstance;
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
});
