import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  errorMessage = signal('');
  loading = signal(false);

  loginData = {
    username: '',
    password: ''
  };

  onLogin(): void {
    this.errorMessage.set('');
    this.loading.set(true);

    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        this.loading.set(false);

        if (response.role === 'ADMIN') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.errorMessage.set('वापरकर्ता नाव किंवा पासवर्ड चुकीचा आहे.');
        this.loading.set(false);
      }
    });
  }
}