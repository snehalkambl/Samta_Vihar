import { CommonModule } from '@angular/common';
import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './expense-list.html',
  styleUrl: './expense-list.css',
})
export class ExpenseList {
  private expenseService = inject(ExpenseService);

  expenses = signal<any[]>([]);
  loading = signal(false);
  errorMessage = signal('');

  totalExpense = computed(() =>
    this.expenses().reduce((sum, item) => sum + Number(item.amount || 0), 0)
  );

  constructor() {
    this.loadExpenses();
  }

  loadExpenses(): void {
    this.loading.set(true);

    this.expenseService.getAllExpenses().subscribe({
      next: (res) => {
        this.expenses.set(res);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Expense load failed:', err);
        this.errorMessage.set('खर्च नोंदी लोड करता आल्या नाहीत.');
        this.loading.set(false);
      }
    });
  }
}