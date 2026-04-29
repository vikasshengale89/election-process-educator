import { TestBed } from '@angular/core/testing';
import { I18nService } from './i18n.service';

describe('I18nService', () => {
  let service: I18nService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(I18nService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should default to English', () => {
    expect(service.currentLang()).toBe('en');
  });

  it('should translate keys in English', () => {
    expect(service.t('nav.home')).toBe('Home');
    expect(service.t('nav.wizard')).toBe('Wizard');
  });

  it('should switch to Spanish', () => {
    service.switchLanguage();
    expect(service.currentLang()).toBe('es');
    expect(service.t('nav.home')).toBe('Inicio');
  });

  it('should toggle back to English', () => {
    service.switchLanguage();
    service.switchLanguage();
    expect(service.currentLang()).toBe('en');
  });

  it('should set language directly', () => {
    service.setLanguage('es');
    expect(service.currentLang()).toBe('es');
  });

  it('should return key if translation missing', () => {
    expect(service.t('nonexistent.key')).toBe('nonexistent.key');
  });

  it('should compute isSpanish correctly', () => {
    expect(service.isSpanish()).toBe(false);
    service.switchLanguage();
    expect(service.isSpanish()).toBe(true);
  });
});
