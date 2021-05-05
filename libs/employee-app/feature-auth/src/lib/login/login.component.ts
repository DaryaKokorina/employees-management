import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { AuthService } from '@dashasorg/auth';
import { LoginData } from '@dashasorg/employee-app/models';

@Component({
  selector: 'emp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  login(data: LoginData) {
    this.authService.login(data.email, data.password)
      .then((userUid) => !!userUid && this.router.navigate(['/']));
  }
}