import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TranslatePipe } from '../../pipes/translate-pipe';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, TranslatePipe],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css'
})
export class ForgotPasswordComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  loading = signal(false);
  otpSent = signal(false);
  successMessage = signal('');
  errorMessage = signal('');

  formData = {
    username: '',
    otp: '',
    newPassword: '',
    confirmPassword: ''
  };

  sendOtp(): void {
    this.successMessage.set('');
    this.errorMessage.set('');

    if (!this.formData.username.trim()) {
      this.errorMessage.set('कृपया Admin username भरा.');
      return;
    }

    this.loading.set(true);

    this.authService.sendResetOtp({
      username: this.formData.username
    }).subscribe({
      next: () => {
        this.otpSent.set(true);
        this.successMessage.set('OTP admin email वर पाठवला आहे.');
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Send OTP failed:', err);
        this.errorMessage.set('OTP पाठवता आला नाही. Username किंवा email तपासा.');
        this.loading.set(false);
      }
    });
  }

  resetPassword(): void {
    this.successMessage.set('');
    this.errorMessage.set('');

    if (!this.formData.username || !this.formData.otp || !this.formData.newPassword) {
      this.errorMessage.set('कृपया सर्व माहिती भरा.');
      return;
    }

    if (this.formData.newPassword !== this.formData.confirmPassword) {
      this.errorMessage.set('New password आणि confirm password match होत नाही.');
      return;
    }

    this.loading.set(true);

    this.authService.resetPassword({
      username: this.formData.username,
      otp: this.formData.otp,
      newPassword: this.formData.newPassword
    }).subscribe({
      next: () => {
        this.successMessage.set('पासवर्ड यशस्वीरित्या बदलला.');
        this.loading.set(false);

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1300);
      },
      error: (err) => {
        console.error('Reset password failed:', err);
        this.errorMessage.set('OTP चुकीचा/expired आहे किंवा password reset करता आला नाही.');
        this.loading.set(false);
      }
    });
  }
}