import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { AuthService } from '@dashasorg/auth';

@Component({
  selector: 'dashasorg-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['login']);
    });
  }
}