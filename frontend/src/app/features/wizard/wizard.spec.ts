import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Wizard } from './wizard';

describe('WizardComponent', () => {
  let component: Wizard;
  let fixture: ComponentFixture<Wizard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Wizard, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Wizard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the wizard component', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial state', () => {
    expect(component.currentStep()).toBe(0);
    expect(component.isComplete()).toBe(false);
    expect(component.answers()).toEqual({});
  });

  it('should update step and answers on selectOption', () => {
    component.selectOption('voterStatus', 'first');
    expect(component.answers()['voterStatus']).toBe('first');
    expect(component.currentStep()).toBe(1);
    expect(component.isComplete()).toBe(false);
  });

  it('should complete wizard after last step', () => {
    component.selectOption('voterStatus', 'first'); // step 0
    component.selectOption('method', 'in-person'); // step 1
    component.selectOption('id', 'dl'); // step 2
    component.selectOption('address', 'current'); // step 3 -> complete

    expect(component.isComplete()).toBe(true);
    expect(component.currentStep()).toBe(3); // doesn't increment past last step
  });

  it('should go back to previous step', () => {
    component.selectOption('voterStatus', 'first');
    expect(component.currentStep()).toBe(1);
    
    component.goBack();
    expect(component.currentStep()).toBe(0);
  });

  it('should reset wizard on restart', () => {
    component.selectOption('voterStatus', 'first');
    component.restart();
    
    expect(component.currentStep()).toBe(0);
    expect(component.isComplete()).toBe(false);
    expect(component.answers()).toEqual({});
  });

  it('should generate checklist based on answers', () => {
    component.selectOption('voterStatus', 'first');
    component.selectOption('method', 'mail');
    component.selectOption('id', 'none');
    component.selectOption('address', 'moved');
    
    const checklist = component.checklist();
    expect(checklist).toContain('📝 Register at least 15 days before the election');
    expect(checklist).toContain('📬 Request your mail-in ballot at least 7 days before election day');
    expect(checklist).toContain('⚠️ Contact your local election office for ID alternatives (affidavit, utility bill, etc.)');
    expect(checklist).toContain('🏠 Update your voter registration with your new address');
  });
});
