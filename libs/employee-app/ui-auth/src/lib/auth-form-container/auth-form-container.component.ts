import { Component, EventEmitter, Output } from "@angular/core";
import { LoginData } from '@dashasorg/employee-app/models';

@Component({
  selector: 'emp-auth-form-container',
  templateUrl: './auth-form-container.component.html',
  styleUrls: ['./auth-form-container.component.css']
})
export class AuthFormContainerComponent {
  @Output() submitLoginData = new EventEmitter<LoginData>();

  formControlPlaceholder = 'Enter here';
  loginData: LoginData = {
    email: '',
    password: ''
  };

  onSubmit() {
    console.log('new login data', this.loginData);
    this.submitLoginData.emit(this.loginData);
  }
}