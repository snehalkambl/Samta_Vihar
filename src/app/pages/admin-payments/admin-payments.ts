import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaymentService } from '../../services/payment.service';
import { Payment } from '../../models/payment.model';

@Component({
  selector: 'app-admin-payments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-payments.html',
  styleUrl: './admin-payments.css'
})
export class AdminPaymentsComponent {
  private paymentService = inject(PaymentService);

  payments = signal<Payment[]>([]);
  allPayments = signal<Payment[]>([]);
  loading = signal(true);
  errorMessage = signal('');
  selectedType = signal('ALL');

  totalDonation = computed(() =>
    this.payments()
      .filter(p => p.paymentType === 'DONATION')
      .reduce((sum, p) => sum + Number(p.amount || 0), 0)
  );

  totalEvent = computed(() =>
    this.payments()
      .filter(p => p.paymentType === 'EVENT')
      .reduce((sum, p) => sum + Number(p.amount || 0), 0)
  );

  totalMembership = computed(() =>
    this.payments()
      .filter(p => p.paymentType === 'MEMBERSHIP')
      .reduce((sum, p) => sum + Number(p.amount || 0), 0)
  );

  totalAll = computed(() =>
    this.payments()
      .reduce((sum, p) => sum + Number(p.amount || 0), 0)
  );

  constructor() {
    this.loadAllPayments();
  }

  loadAllPayments(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.paymentService.getAllPayments().subscribe({
      next: (response) => {
        console.log('All payments response:', response);
        this.allPayments.set(response);
        this.applyFilter();
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading payments:', error);
        this.errorMessage.set('पेमेंट माहिती मिळाली नाही.');
        this.loading.set(false);
      }
    });
  }

  applyFilter(): void {
    const selected = this.selectedType();
    const source = this.allPayments();

    if (selected === 'ALL') {
      this.payments.set(source);
    } else {
      this.payments.set(source.filter(payment => payment.paymentType === selected));
    }

    console.log('Filtered payments:', this.payments());
  }

  onTypeChange(value: string): void {
    this.selectedType.set(value);
    this.applyFilter();
  }
}