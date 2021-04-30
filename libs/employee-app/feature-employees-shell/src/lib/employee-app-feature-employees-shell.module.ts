import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';


export const empFeatureEmployeesShellRoutes: Route[] = [
  {
    path: '',
    loadChildren: () => import('@dashasorg/employee-app/feature-employees-list').then(m => m.EmployeeAppFeatureEmployeesListModule)
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(empFeatureEmployeesShellRoutes)
  ],
  exports: [RouterModule]
})
export class EmployeeAppFeatureEmployeesShellModule {}
