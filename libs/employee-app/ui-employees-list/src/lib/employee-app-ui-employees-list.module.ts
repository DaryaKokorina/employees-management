import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EmployeesListComponent } from './employees-list/employees-list.component';

@NgModule({
  imports: [CommonModule],
  declarations: [EmployeesListComponent],
  exports: [EmployeesListComponent]
})
export class EmployeeAppUiEmployeesListModule {}
