import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '@dashasorg/auth';
import { AuthFormContainerComponent } from '@dashasorg/employee-app/ui-auth';
import { of } from 'rxjs';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement;
  let authService: AuthService;
  let router: Router;

  const mockLoginData = {
    email: 'email',
    password: 'password'
  }

  let userUid = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [LoginComponent, AuthFormContainerComponent],
      providers: [
        { provide: AuthService, useValue: { login: jest.fn(() => of(userUid)) }},
        { provide: Router, useValue: { navigate: jest.fn() } }
      ]
    }).compileComponents()
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);
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

  it('should call AuthService method during calling component login method', async () => {
    const authServiceSpy = jest.spyOn(authService, 'login');

    await component.login(mockLoginData);
    expect(authServiceSpy).toHaveBeenCalledWith(mockLoginData.email, mockLoginData.password);
  })

  it('should redirect to home page if user is logged in', async () => {
    userUid = 'ABC123';
    const routerSpy = jest.spyOn(router, 'navigate');

    await component.login(mockLoginData);
    expect(routerSpy).toHaveBeenCalledWith(['/']);
  });

  it('should not redirect to home page if user is not logged in', async () => {
    userUid = null;
    const routerSpy = jest.spyOn(router, 'navigate');

    await component.login(mockLoginData);
    expect(routerSpy).not.toHaveBeenCalledWith(['/']);
  });
});