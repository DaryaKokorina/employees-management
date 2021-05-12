import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { handleError } from '@dashasorg/utils';
import { from, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor( // Inject Firestore service
    private afAuth: AngularFireAuth, // Inject Firebase auth service
    private router: Router,// NgZone service to remove outside scope warning
  ) {}

  // Sign in with email/password
  login(email: string, password: string): Observable<string | void> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
      map((res) => res.user.uid),
      catchError(handleError)
    );
  }

  // Returns true when user is looged in
  isLoggedIn(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map((res) => !!res?.uid)
    );
  }

  logout(): Observable<void> {
    return from(this.afAuth.signOut());
  }
}