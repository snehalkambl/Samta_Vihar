import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IncomeService } from '../../services/income.service';
import { TranslatePipe } from '../../pipes/translate-pipe';

@Component({
  selector: 'app-create-income',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './create-income.html',
  styleUrl: './create-income.css'
})
export class CreateIncomeComponent {

  private incomeService = inject(IncomeService);
  private router = inject(Router);

  loading = signal(false);
  successMessage = signal('');
  errorMessage = signal('');

  incomeForm = {
    incomeType: 'MARRIAGE',
    personName: '',
    mobile: '',
    description: '',
    amount: 0,
    incomeDate: '',
    paymentMode: 'CASH',
    remarks: ''
  };

  submitForm(): void {

    this.loading.set(true);
    this.successMessage.set('');
    this.errorMessage.set('');

    this.incomeService.createIncome(this.incomeForm).subscribe({

      next: () => {

        this.successMessage.set(
          'उत्पन्न नोंद यशस्वीरीत्या जतन झाली.'
        );

        this.loading.set(false);

        setTimeout(() => {
          this.router.navigate(['/admin/income']);
        }, 1000);
      },

      error: (error) => {

        console.error('Income save failed:', error);

        this.errorMessage.set(
          'उत्पन्न नोंद जतन करता आली नाही.'
        );

        this.loading.set(false);
      }
    });
  }
}