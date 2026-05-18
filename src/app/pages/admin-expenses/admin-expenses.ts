import { CommonModule, DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense.model';

@Component({
  selector: 'app-admin-expenses',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, DatePipe],
  templateUrl: './admin-expenses.html',
  styleUrl: './admin-expenses.css'
})
export class AdminExpensesComponent {
  private expenseService = inject(ExpenseService);

  expenses = signal<Expense[]>([]);
  allExpenses = signal<Expense[]>([]);
  loading = signal(true);
  errorMessage = signal('');
  selectedType = signal('ALL');

  totalExpense = computed(() =>
    this.expenses().reduce((sum, item) => sum + Number(item.amount || 0), 0)
  );

  constructor() {
    this.loadAllExpenses();
  }

  loadAllExpenses(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.expenseService.getAllExpenses().subscribe({
      next: (response) => {
        this.allExpenses.set(response);
        this.applyFilter();
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading expenses:', error);
        this.errorMessage.set('खर्च माहिती मिळाली नाही.');
        this.loading.set(false);
      }
    });
  }

  applyFilter(): void {
    const selected = this.selectedType();

    if (selected === 'ALL') {
      this.expenses.set(this.allExpenses());
      return;
    }

    this.expenses.set(
      this.allExpenses().filter(item => item.expenseType === selected)
    );
  }

  onTypeChange(value: string): void {
    this.selectedType.set(value);
    this.applyFilter();
  }

  getExpenseTypeLabel(type: string): string {
    switch (type) {
      case 'ELECTRICITY': return 'वीज बिल';
      case 'WATER_BILL': return 'पाणी बिल';
      case 'CLEANING': return 'स्वच्छता';
      case 'DECORATION': return 'सजावट';
      case 'FOOD': return 'भोजन';
      case 'MAINTENANCE': return 'देखभाल';
      case 'SALARY': return 'पगार';
      case 'PROGRAM_EXPENSE': return 'कार्यक्रम खर्च';
      case 'REPAIR': return 'दुरुस्ती';
      default: return 'इतर';
    }
  }
}