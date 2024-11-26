import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faShoppingCart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  faUser = faUser;
  faShoppingCart = faShoppingCart;
  faSignOutAlt = faSignOutAlt;
  isLoggedIn = false;

  constructor(private router: Router, private authService: AuthService) {}

  onUserIconClick(): void {
    if (this.isLoggedIn) {
      this.authService.logout();
      this.isLoggedIn = false;
      this.router.navigate(['/']);
    } else {
      this.authService.login();
      this.isLoggedIn = true;
      this.router.navigate(['/admin']);
    }
  }

  onAdminLinkClick(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/admin']);
    } else {
      alert('Você não é administrador. Precisa logar.');
    }
  }
}