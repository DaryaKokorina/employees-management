import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '@dashasorg/auth';
import { of } from 'rxjs';
import { AuthGuard } from './auth.guard';



describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let router: Router;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: { isLoggedIn: jest.fn() } },
        { provide: Router, useValue: { navigate: jest.fn() } }
      ]
    });

    authGuard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);
  });

  it('be able to push route when user is logged in', done => {
    authService.isLoggedIn = jest.fn(() => of(true));
    authGuard.canActivate().subscribe((res) => {
      expect(res).toBeTruthy();
      done();
    });
  });

  it('not be able to go to the home page when user is not logged in', done => {
    authService.isLoggedIn = jest.fn(() => of(false));
    const routerSpy = jest.spyOn(router, 'navigate');
    authGuard.canActivate().subscribe((res) => {
      expect(res).toBeFalsy();
      expect(routerSpy).toHaveBeenCalledWith(['login']);
      done();
    });
  });
});