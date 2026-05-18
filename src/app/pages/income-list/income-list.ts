import { CommonModule } from '@angular/common';
import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IncomeService } from '../../services/income.service';

@Component({
  selector: 'app-income-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './income-list.html',
  styleUrl: './income-list.css',
})
export class IncomeList {
  private incomeService = inject(IncomeService);

  incomes = signal<any[]>([]);
  loading = signal(false);
  errorMessage = signal('');

  totalIncome = computed(() =>
    this.incomes().reduce((sum, item) => sum + Number(item.amount || 0), 0)
  );

  constructor() {
    this.loadIncome();
  }

  loadIncome(): void {
    this.loading.set(true);

    this.incomeService.getAllIncome().subscribe({
      next: (res) => {
        this.incomes.set(res);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Income load failed:', err);
        this.errorMessage.set('उत्पन्न नोंदी लोड करता आल्या नाहीत.');
        this.loading.set(false);
      }
    });
  }
}