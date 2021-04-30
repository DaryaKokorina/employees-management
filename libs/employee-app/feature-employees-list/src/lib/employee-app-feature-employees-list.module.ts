import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { EmployeeAppUiEmployeesListModule } from '@dashasorg/employee-app/ui-employees-list';
import { EmployeesListContainerComponent } from './employees-list-container/employees-list-container.component';

export const employeesListRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: EmployeesListContainerComponent
  }
];

@NgModule({
  imports: [CommonModule, EmployeeAppUiEmployeesListModule, RouterModule.forChild(employeesListRoutes)],
  declarations: [EmployeesListContainerComponent]
})
export class EmployeeAppFeatureEmployeesListModule {}
