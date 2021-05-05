import { async, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let afAuth: AngularFireAuth;
  let router: Router;

  const credentialsMock = {
    email: 'abc@123.com',
    password: 'password'
  };

  const userMock = {
    uid: 'ABC123',
    email: credentialsMock.email
  };

  const fakeAuthState = new BehaviorSubject(null);

  const fakeLoginHandler = (email: string, password: string): Promise<any> => {
    fakeAuthState.next(userMock);
    router.navigate(['/']);
    return new Promise((resolve, reject) => {
      email === credentialsMock.email ?
        resolve(userMock) :
        reject(new Error('Error occurs during user login!'));
    });
  };

  const fakeLogoutHandler = (): Promise<any> => {
    fakeAuthState.next(null);
    router.navigate(['logout']);
    return Promise.resolve();
  };

  const angularFireAuthStub = {
    authState: fakeAuthState,
    signInWithEmailAndPassword: (email: string, password: string) => fakeLoginHandler(email, password),
    signOut: () => fakeLogoutHandler()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        AuthService,
        { provide: AngularFireAuth, useValue: angularFireAuthStub },
        { provide: Router, useValue: { navigate: jest.fn() } }
      ]
    }).compileComponents();

    service = TestBed.inject(AuthService);
    afAuth = TestBed.inject(AngularFireAuth);
    router = TestBed.inject(Router);
  }));

  afterEach(() => {
    fakeAuthState.next(null);
  });

  it('service should be created', () => {
      expect(service).toBeTruthy();
  });

  it('should call login successfully', async () => {
      await service.login(credentialsMock.email, credentialsMock.password);
      const navigateSpy = jest.spyOn(router, 'navigate');

      expect(navigateSpy).toHaveBeenLastCalledWith(['/']);
      expect(fakeAuthState.value).toEqual(userMock);
  });

  it('should fail login', async () => {
    await service.login('some other email', credentialsMock.password);
    expect(service.login).toThrowError();
  });

  it('should call logout successfully', async () => {
    await service.login(credentialsMock.email, credentialsMock.password);
    expect(fakeAuthState.value).toEqual(userMock);
    await service.logout();
    const navigateSpy = jest.spyOn(router, 'navigate');

  expect(navigateSpy).toHaveBeenLastCalledWith(['login']);
    expect(fakeAuthState.value).toEqual(null);
  });

  it('isLoggedIn should return uid after login', async () => {
    await service.login(credentialsMock.email, credentialsMock.password);
    expect(fakeAuthState.value.uid).toEqual(userMock.uid);
  });

  it('isLoggedIn should return nul, user is not logged in', () => {
    expect(fakeAuthState.value).toEqual(null);
  });
});