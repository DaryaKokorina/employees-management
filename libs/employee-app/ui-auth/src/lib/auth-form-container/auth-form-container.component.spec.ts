import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AuthFormContainerComponent } from './auth-form-container.component';


describe('AuthFormContainerComponent', () => {
  let component: AuthFormContainerComponent;
  let fixture: ComponentFixture<AuthFormContainerComponent>;

  const mockLoginData = {
    email: 'test@test.com',
    password: '123'
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AuthFormContainerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('placeholder is got from component instance (string intrapolation)', () => {
    const inputs: HTMLElement[] = fixture.nativeElement.querySelectorAll('input');

    inputs.forEach(input => {
      expect(input.getAttribute('placeholder')).toEqual(component.formControlPlaceholder);
    });
  });

  it('should run onSubmit method after click on the login button', () => {
    component.onSubmit = jest.fn();
    fixture.detectChanges();
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('submit', null);
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('check initial inputs value', () => {
    const hostElement = fixture.nativeElement;
    const inputs: HTMLInputElement[] = hostElement.querySelectorAll('input');

    expect(inputs[0].value).toEqual('');
    expect(inputs[1].value).toEqual('');
  });

  it('loginData property changes according to inputs value', () => {
    const hostElement = fixture.nativeElement;
    const inputs: HTMLInputElement[] = hostElement.querySelectorAll('input');

    inputs[0].value = mockLoginData.email;
    inputs[1].value = mockLoginData.password;

    inputs[0].dispatchEvent(new Event('input'));
    inputs[1].dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.loginData.email).toEqual(mockLoginData.email);
    expect(component.loginData.password).toEqual(mockLoginData.password);
  });

  it('raises the loginData event when submitted form', () => {
    component.loginData = mockLoginData;
    component.passLoginData.subscribe(loginData => expect(loginData).toEqual(mockLoginData));
    component.onSubmit();
  });
});