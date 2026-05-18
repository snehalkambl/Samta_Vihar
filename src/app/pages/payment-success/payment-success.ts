import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Payment } from '../../models/payment.model';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './payment-success.html',
  styleUrl: './payment-success.css'
})
export class PaymentSuccessComponent {
  private router = inject(Router);

  payment = signal<Payment | null>(null);

  constructor() {
    const nav = this.router.getCurrentNavigation();
    const statePayment = nav?.extras?.state?.['payment'] as Payment | undefined;

    if (statePayment) {
      this.payment.set(statePayment);
    } else {
      const historyStatePayment = history.state?.payment as Payment | undefined;
      if (historyStatePayment) {
        this.payment.set(historyStatePayment);
      }
    }
  }
}