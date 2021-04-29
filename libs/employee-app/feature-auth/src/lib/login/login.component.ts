import { Component } from "@angular/core";
import { LoginData } from '@dashasorg/employee-app/models';

@Component({
  selector: 'emp-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  login(data: LoginData) {
    console.log('feature-auth', data);
  }
}