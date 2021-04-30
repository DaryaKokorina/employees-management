import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@dashasorg/employee-app/feature-auth';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: HomeComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/employees'
      },
      {
        path: 'employees',
        loadChildren: () => import('@dashasorg/employee-app/feature-employees-shell').then(m => m.EmployeeAppFeatureEmployeesShellModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}