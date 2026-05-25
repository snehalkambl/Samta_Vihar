import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MemberService } from '../../services/member.service';
import { TranslatePipe } from '../../pipes/translate-pipe';

@Component({
  selector: 'app-membership',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './membership.html',
  styleUrl: './membership.css'
})
export class MembershipComponent {
  private memberService = inject(MemberService);
  private router = inject(Router);

  loading = signal(false);
  successMessage = signal('');
  errorMessage = signal('');

  member = {
    fullName: '',
    mobile: '',
    address: '',
    paymentStatus: 'UNPAID',
    paymentMode: 'CASH',
    transactionId: ''
  };

  onSubmit(): void {
    this.successMessage.set('');
    this.errorMessage.set('');

    if (!this.member.fullName.trim()) {
      this.errorMessage.set('कृपया पूर्ण नाव भरा.');
      return;
    }

    if (!this.member.mobile.trim()) {
      this.errorMessage.set('कृपया मोबाईल क्रमांक भरा.');
      return;
    }

    if (
      this.member.paymentStatus === 'PAID' &&
      this.member.paymentMode === 'ONLINE' &&
      !this.member.transactionId.trim()
    ) {
      this.errorMessage.set('ऑनलाइन पेमेंटसाठी Transaction ID भरा.');
      return;
    }

    this.loading.set(true);

    this.memberService.createMember(this.member).subscribe({
      next: () => {
        this.successMessage.set('सदस्य नोंदणी यशस्वीरीत्या झाली.');
        this.loading.set(false);

        this.member = {
          fullName: '',
          mobile: '',
          address: '',
          paymentStatus: 'UNPAID',
          paymentMode: 'CASH',
          transactionId: ''
        };

        setTimeout(() => {
          this.router.navigate(['/member-list']);
        }, 1200);
      },
      error: (error) => {
        console.error('Member registration failed:', error);
        this.errorMessage.set('सदस्य नोंदणी करता आली नाही.');
        this.loading.set(false);
      }
    });
  }
}