import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { AuthService } from '@dashasorg/auth';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'dashasorg-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout().pipe(
      take(1),
      tap(() => this.router.navigate(['login']))
    ).subscribe();
  }
}