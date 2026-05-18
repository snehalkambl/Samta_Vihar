import { CommonModule } from '@angular/common';
import { Component, inject, signal, computed } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EventService } from '../../services/event.service';
import { MemberService } from '../../services/member.service';
import { PaymentService } from '../../services/payment.service';
import { IncomeService } from '../../services/income.service';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboardComponent {
  private eventService = inject(EventService);
  private memberService = inject(MemberService);
  private paymentService = inject(PaymentService);
  private incomeService = inject(IncomeService);
  private expenseService = inject(ExpenseService);

  events = signal<any[]>([]);
  members = signal<any[]>([]);
  payments = signal<any[]>([]);
  incomes = signal<any[]>([]);
  expenses = signal<any[]>([]);

  totalIncome = computed(() =>
    this.incomes().reduce((sum, item) => sum + Number(item.amount || 0), 0)
  );

  totalExpense = computed(() =>
    this.expenses().reduce((sum, item) => sum + Number(item.amount || 0), 0)
  );

  totalPaymentAmount = computed(() =>
    this.payments().reduce((sum, payment) => sum + Number(payment.amount || 0), 0)
  );

  totalEventPaymentAmount = computed(() =>
    this.payments()
      .filter(payment => payment.paymentType === 'EVENT')
      .reduce((sum, payment) => sum + Number(payment.amount || 0), 0)
  );

  totalDonationAmount = computed(() =>
    this.payments()
      .filter(payment => payment.paymentType === 'DONATION')
      .reduce((sum, payment) => sum + Number(payment.amount || 0), 0)
  );

  balance = computed(() =>
    this.totalIncome() + this.totalPaymentAmount() - this.totalExpense()
  );

  recentPayments = computed(() => this.payments().slice(0, 5));
  recentEvents = computed(() => this.events().slice(0, 5));

  quickActions = [
    { title: 'कार्यक्रम तयार करा', route: '/admin/events/create' },
    { title: 'उत्पन्न जोडा', route: '/admin/income/create' },
    { title: 'खर्च जोडा', route: '/admin/expenses/create' },
    { title: 'सदस्य यादी', route: '/member-list' }
  ];

  constructor() {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.eventService.getAllEvents().subscribe(res => this.events.set(res));
    this.memberService.getAllMembers().subscribe(res => this.members.set(res));
    this.paymentService.getAllPayments().subscribe(res => this.payments.set(res));
    this.incomeService.getAllIncome().subscribe(res => this.incomes.set(res));
    this.expenseService.getAllExpenses().subscribe(res => this.expenses.set(res));
  }
}