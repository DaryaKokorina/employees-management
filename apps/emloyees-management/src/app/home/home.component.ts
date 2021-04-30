import { Component } from "@angular/core";
import { AuthService } from '@dashasorg/auth';

@Component({
  selector: 'dashasorg-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}