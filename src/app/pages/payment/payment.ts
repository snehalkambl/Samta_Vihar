import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PaymentService } from '../../services/payment.service';
import { Payment } from '../../models/payment.model';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.html',
  styleUrl: './payment.css'
})
export class PaymentComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private paymentService = inject(PaymentService);

  paymentType = signal('DONATION');
  eventId = signal<number | null>(null);
  membershipId = signal<number | null>(null);
  amount = signal<number>(0);

  payerName = '';
  mobile = '';
  paymentMode = 'CASH';
  transactionId = '';
  remarks = '';

  loading = signal(false);
  errorMessage = signal('');

  constructor() {
    this.route.queryParams.subscribe(params => {
      this.paymentType.set(params['type'] || 'DONATION');
      this.eventId.set(params['eventId'] ? Number(params['eventId']) : null);
      this.membershipId.set(params['membershipId'] ? Number(params['membershipId']) : null);
      this.amount.set(params['amount'] ? Number(params['amount']) : 0);
    });
  }

  submitPayment(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    const payment: Payment = {
      payerName: this.payerName,
      mobile: this.mobile,
      amount: this.amount(),
      paymentType: this.paymentType(),
      paymentMode: this.paymentMode,
      transactionId:
        this.paymentMode === 'CASH'
          ? `CASH-${Date.now()}`
          : this.transactionId || `TXN-${Date.now()}`,
      eventId: this.paymentType() === 'EVENT' ? this.eventId() : null,
      membershipId: this.paymentType() === 'MEMBERSHIP' ? this.membershipId() : null,
      status: 'SUCCESS',
      remarks: this.remarks
    };

    this.paymentService.createPayment(payment).subscribe({
      next: (response) => {
        this.loading.set(false);

        this.router.navigate(['/payment-success'], {
          state: {
            payment: response
          }
        });
      },
      error: (error) => {
        console.error('Payment failed:', error);
        this.errorMessage.set('पेमेंट जतन करता आले नाही.');
        this.loading.set(false);
      }
    });
  }
}