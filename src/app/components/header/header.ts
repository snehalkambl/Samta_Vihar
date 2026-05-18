import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  readonly browserMode = isPlatformBrowser(this.platformId);

  isLoggedIn(): boolean {
    if (!this.browserMode) return false;
    return this.authService.isLoggedIn();
  }

  isAdmin(): boolean {
    if (!this.browserMode) return false;
    return this.authService.isAdmin();
  }

  username(): string {
    if (!this.browserMode) return '';
    return this.authService.getUsername();
  }

  logout(): void {
    if (!this.browserMode) return;
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}