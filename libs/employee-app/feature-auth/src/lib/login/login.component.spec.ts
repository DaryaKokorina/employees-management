import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AuthService } from '@dashasorg/auth';
import { AuthFormContainerComponent } from '@dashasorg/employee-app/ui-auth';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement;
  let authService: AuthService;

  const mockLoginData = {
    email: 'email',
    password: 'password'
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [LoginComponent, AuthFormContainerComponent],
      providers: [{ provide: AuthService, useValue: { login: jest.fn() }}]
    }).compileComponents()
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('component login method should be invoked after emitting custom event data', () => {
    const spy = jest.spyOn(component, 'login');
    const authForm = de.query(By.directive(AuthFormContainerComponent));
    const authFormInstance = authForm.componentInstance;
    authFormInstance.passLoginData.emit(mockLoginData);
    expect(spy).toHaveBeenCalledWith(mockLoginData);
  });

  it('should call AuthService method during calling component login method', () => {
    authService = TestBed.inject(AuthService);
    const spy = jest.spyOn(authService, 'login');
    const authForm = de.query(By.directive(AuthFormContainerComponent));
    const authFormInstance = authForm.componentInstance;
    authFormInstance.passLoginData.emit(mockLoginData);
    expect(spy).toHaveBeenCalledWith(mockLoginData.email, mockLoginData.password);
  })
});