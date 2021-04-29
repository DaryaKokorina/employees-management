import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthFormContainerComponent } from './auth-form-container/auth-form-container.component';


@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [AuthFormContainerComponent],
  exports: [AuthFormContainerComponent]
})
export class EmployeeAppUiAuthModule {}
