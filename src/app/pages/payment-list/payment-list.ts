import { CommonModule } from '@angular/common';
import { Component, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PaymentService } from '../../services/payment.service';
import { TranslatePipe } from '../../pipes/translate-pipe';

@Component({
  selector: 'app-payment-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, TranslatePipe],
  templateUrl: './payment-list.html',
  styleUrl: './payment-list.css',
})
export class PaymentList {
  private paymentService = inject(PaymentService);

  payments = signal<any[]>([]);
  loading = signal(false);
  saving = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  payment = {
    payerName: '',
    mobile: '',
    paymentType: 'DONATION',
    amount: 0,
    paymentMode: 'CASH',
    transactionId: '',
    remarks: '',
    status: 'SUCCESS'
  };

  totalAmount = computed(() =>
    this.payments().reduce(
      (sum, payment) => sum + Number(payment.amount || 0),
      0
    )
  );

  constructor() {
    this.loadPayments();
  }

  loadPayments(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.paymentService.getAllPayments().subscribe({
      next: (res) => {
        this.payments.set(res || []);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Payment load failed:', err);
        this.errorMessage.set('पेमेंट नोंदी लोड करता आल्या नाहीत.');
        this.loading.set(false);
      }
    });
  }

  submitPayment(): void {
    this.errorMessage.set('');
    this.successMessage.set('');

    if (!this.payment.payerName || !this.payment.mobile || !this.payment.amount) {
      this.errorMessage.set('कृपया नाव, मोबाईल नंबर आणि रक्कम भरा.');
      return;
    }

    const payload = {
      payerName: this.payment.payerName,
      mobile: this.payment.mobile,
      paymentType: this.payment.paymentType,
      amount: Number(this.payment.amount),
      paymentMode: this.payment.paymentMode,
      transactionId: this.payment.transactionId || undefined,
      remarks: this.payment.remarks || undefined,
      status: 'SUCCESS'
    };

    this.saving.set(true);

    this.paymentService.createPayment(payload).subscribe({
      next: () => {
        this.successMessage.set('पेमेंट नोंद यशस्वीरित्या जोडली.');
        this.resetForm();
        this.saving.set(false);
        this.loadPayments();
      },
      error: (err) => {
        console.error('Payment save failed:', err);
        this.errorMessage.set('पेमेंट नोंद जतन करता आली नाही.');
        this.saving.set(false);
      }
    });
  }

  resetForm(): void {
    this.payment = {
      payerName: '',
      mobile: '',
      paymentType: 'DONATION',
      amount: 0,
      paymentMode: 'CASH',
      transactionId: '',
      remarks: '',
      status: 'SUCCESS'
    };
  }
}