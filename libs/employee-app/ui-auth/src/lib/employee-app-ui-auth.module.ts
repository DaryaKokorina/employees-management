import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthFormContainerComponent } from './auth-form-container/auth-form-container.component';


@NgModule({
  imports: [CommonModule],
  declarations: [AuthFormContainerComponent],
  exports: [AuthFormContainerComponent]
})
export class EmployeeAppUiAuthModule {}
