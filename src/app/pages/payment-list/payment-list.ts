import { CommonModule } from '@angular/common';
import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-payment-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './payment-list.html',
  styleUrl: './payment-list.css',
})
export class PaymentList {
  private paymentService = inject(PaymentService);

  payments = signal<any[]>([]);
  loading = signal(false);
  errorMessage = signal('');

  totalAmount = computed(() =>
    this.payments().reduce((sum, payment) => sum + Number(payment.amount || 0), 0)
  );

  constructor() {
    this.loadPayments();
  }

  loadPayments(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.paymentService.getAllPayments().subscribe({
      next: (res) => {
        this.payments.set(res);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Payment load failed:', err);
        this.errorMessage.set('पेमेंट नोंदी लोड करता आल्या नाहीत.');
        this.loading.set(false);
      }
    });
  }
}