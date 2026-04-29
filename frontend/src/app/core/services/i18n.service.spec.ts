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

  it('should translate English keys', () => {
    expect(service.t('nav.home')).toBe('Home');
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

  it('should return key if translation missing', () => {
    expect(service.t('missing.key')).toBe('missing.key');
  });

  it('should set language directly', () => {
    service.setLanguage('es');
    expect(service.currentLang()).toBe('es');
    expect(service.isSpanish()).toBe(true);
  });

  it('should report isSpanish correctly', () => {
    expect(service.isSpanish()).toBe(false);
    service.setLanguage('es');
    expect(service.isSpanish()).toBe(true);
  });

  it('should translate polling and share nav keys', () => {
    expect(service.t('nav.polling')).toBe('Polling');
    expect(service.t('nav.share')).toBe('Share');
    service.setLanguage('es');
    expect(service.t('nav.polling')).toBe('Ubicación');
    expect(service.t('nav.share')).toBe('Compartir');
  });

  it('should translate idle overlay keys', () => {
    expect(service.t('idle.title')).toBe('Your Vote Matters');
    service.setLanguage('es');
    expect(service.t('idle.title')).toBe('Tu Voto Importa');
  });
});
