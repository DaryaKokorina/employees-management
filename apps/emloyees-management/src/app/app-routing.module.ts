import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
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
  },
  {
    path: 'login',
    loadChildren: () => import('@dashasorg/employee-app/feature-auth').then(m => m.EmployeeAppFeatureAuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}