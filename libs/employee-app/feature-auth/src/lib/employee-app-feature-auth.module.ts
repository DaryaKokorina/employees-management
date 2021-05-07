import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AuthService } from '@dashasorg/auth';
import { EmployeeAppUiAuthModule } from '@dashasorg/employee-app/ui-auth';
import { LoginComponent } from './login/login.component';

export const loginRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent
  }
];

@NgModule({
  imports: [CommonModule, EmployeeAppUiAuthModule, RouterModule.forChild(loginRoutes)],
  declarations: [LoginComponent],
  providers: [AuthService]
})
export class EmployeeAppFeatureAuthModule {}
