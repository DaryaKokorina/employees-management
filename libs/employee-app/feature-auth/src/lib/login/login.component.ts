import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { AuthService } from '@dashasorg/auth';
import { LoginData } from '@dashasorg/employee-app/models';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'emp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  login(data: LoginData) {
    this.authService.login(data.email, data.password).pipe(
      take(1),
      tap((userUid) => !!userUid && this.router.navigate(['/']))
    ).subscribe();
  }
}