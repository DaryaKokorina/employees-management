import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthService } from '@dashasorg/auth';
import { EmployeeAppUiAuthModule } from '@dashasorg/employee-app/ui-auth';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';



@NgModule({
  imports: [CommonModule, EmployeeAppUiAuthModule, AuthRoutingModule],
  declarations: [LoginComponent],
  providers: [AuthService]
})
export class EmployeeAppFeatureAuthModule {}
