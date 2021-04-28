import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { LoginComponent } from '@dashasorg/employee-app/feature-auth';


export const empFeatureEmployeesShellRoutes: Route[] = [
  {
    path: '',
    component: LoginComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(empFeatureEmployeesShellRoutes)
  ],
})
export class EmployeeAppFeatureEmployeesShellModule {}
