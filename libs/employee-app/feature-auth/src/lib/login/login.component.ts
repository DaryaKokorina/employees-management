import { Component } from "@angular/core";
import { AuthService } from '@dashasorg/auth';
import { LoginData } from '@dashasorg/employee-app/models';

@Component({
  selector: 'emp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  login(data: LoginData) {
    console.log('feature-auth', data);
    this.authService.login(data.email, data.password);
  }
}