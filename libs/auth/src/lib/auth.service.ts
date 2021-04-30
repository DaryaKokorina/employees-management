import { Injectable, NgZone } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(
    private afs: AngularFirestore, // Inject Firestore service
    private afAuth: AngularFireAuth, // Inject Firebase auth service
    private router: Router,
    private ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage during first load */
    this.afAuth.authState.pipe(take(1)).subscribe(user => {
      console.log('auth Service constructor', user);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  // Sign in with email/password
  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        localStorage.setItem('user', JSON.stringify(result.user));
        this.ngZone.run(() => {
          this.router.navigate(['/'])
        });
        console.log('auth Service login', result.user);
      }).catch((err) => {
        window.alert(err.message);
      });
  }

  // Returns true when user is looged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null ? true : false;
  }

  logout() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    })
  }
}