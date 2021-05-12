import { async, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from "@angular/fire/auth";
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let afAuth: AngularFireAuth;

  const credentialsMock = {
    email: 'abc@123.com',
    password: 'password'
  };

  const resDataMock = {
    user: {
      uid: 'ABC123',
      email: credentialsMock.email
    }
  };

  const fakeAuthState = new BehaviorSubject(null);

  const fakeLoginHandler = (email: string, password: string): Observable<any> => {
    fakeAuthState.next(resDataMock.user);
    return email === credentialsMock.email && password === credentialsMock.password ?
        of(resDataMock) :
        of(new Error('Error occurs during user login!'));
    };

  const fakeLogoutHandler = (): Observable<void> => {
    fakeAuthState.next(null);
    return of();
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
        { provide: AngularFireAuth, useValue: angularFireAuthStub }
      ]
    }).compileComponents();

    service = TestBed.inject(AuthService);
    afAuth = TestBed.inject(AngularFireAuth);
  }));

  afterEach(() => {
    fakeAuthState.next(null);
  });

  it('service should be created', () => {
      expect(service).toBeTruthy();
  });

  it('should call login successfully when backend return user data', async () => {
      await service.login(credentialsMock.email, credentialsMock.password);
      expect(fakeAuthState.value).toEqual(resDataMock.user);
  });

  it('should fail login when backend doesn\'t return user data', async () => {
    await service.login('some other email', credentialsMock.password);
    expect(service.login).toThrowError();
  });

  it('should call logout successfully', async () => {
    await service.login(credentialsMock.email, credentialsMock.password);
    expect(fakeAuthState.value).toEqual(resDataMock.user);
    await service.logout();
    expect(fakeAuthState.value).toEqual(null);
  });

  it('isLoggedIn should return uid after login', async () => {
    await service.login(credentialsMock.email, credentialsMock.password);
    expect(fakeAuthState.value.uid).toEqual(resDataMock.user.uid);
  });

  it('isLoggedIn should return nul, user is not logged in', () => {
    expect(fakeAuthState.value).toEqual(null);
  });
});