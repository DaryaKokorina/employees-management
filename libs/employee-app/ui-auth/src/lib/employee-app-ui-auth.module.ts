import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeAppUiErrorMessageModule } from '@dashasorg/employee-app/ui-error-message';
import { AuthFormContainerComponent } from './auth-form-container/auth-form-container.component';


@NgModule({
  imports: [CommonModule, FormsModule, EmployeeAppUiErrorMessageModule],
  declarations: [AuthFormContainerComponent],
  exports: [AuthFormContainerComponent]
})
export class EmployeeAppUiAuthModule {}
