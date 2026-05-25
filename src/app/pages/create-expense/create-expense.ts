import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ExpenseService } from '../../services/expense.service';
import { TranslatePipe } from '../../pipes/translate-pipe';

@Component({
  selector: 'app-create-expense',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './create-expense.html',
  styleUrl: './create-expense.css'
})
export class CreateExpenseComponent {
  private expenseService = inject(ExpenseService);
  private router = inject(Router);

  loading = signal(false);
  successMessage = signal('');
  errorMessage = signal('');

  expenseForm = {
    expenseType: 'ELECTRICITY',
    personName: '',
    mobile: '',
    description: '',
    amount: 0,
    expenseDate: '',
    paymentMode: 'CASH',
    remarks: ''
  };

  submitForm(): void {
    this.loading.set(true);
    this.successMessage.set('');
    this.errorMessage.set('');

    this.expenseService.createExpense(this.expenseForm).subscribe({
      next: () => {
        this.successMessage.set('खर्च नोंद यशस्वीरीत्या जतन झाली.');
        this.loading.set(false);

        setTimeout(() => {
          this.router.navigate(['/admin/expenses']);
        }, 1000);
      },
      error: (error) => {
        console.error('Expense save failed:', error);
        this.errorMessage.set('खर्च नोंद जतन करता आली नाही.');
        this.loading.set(false);
      }
    });
  }
}