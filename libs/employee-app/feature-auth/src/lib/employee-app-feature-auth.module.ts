import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EmployeeAppUiAuthModule } from '@dashasorg/employee-app/ui-auth';
import { LoginComponent } from './login/login.component';



@NgModule({
  imports: [CommonModule, EmployeeAppUiAuthModule],
  declarations: [LoginComponent]
})
export class EmployeeAppFeatureAuthModule {}
