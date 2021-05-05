import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor( // Inject Firestore service
    private afAuth: AngularFireAuth, // Inject Firebase auth service
    private router: Router,// NgZone service to remove outside scope warning
  ) {}

  // Sign in with email/password
  login(email: string, password: string): Promise<string | void> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((res) => res.user.uid)
      .catch((err) => {
        console.log('Something went wrong: ', err.message);
      });
  }

  // Returns true when user is looged in
  isLoggedIn(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map((res) => !!res.uid)
    );
  }

  logout(): Promise<void> {
    return this.afAuth.signOut();
  }
}