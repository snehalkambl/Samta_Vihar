import { CommonModule, DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IncomeService } from '../../services/income.service';
import { Income } from '../../models/income.model';

@Component({
  selector: 'app-admin-income',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, DatePipe],
  templateUrl: './admin-income.html',
  styleUrl: './admin-income.css'
})
export class AdminIncomeComponent {
  private incomeService = inject(IncomeService);

  incomes = signal<Income[]>([]);
  allIncomes = signal<Income[]>([]);
  loading = signal(true);
  errorMessage = signal('');
  selectedType = signal('ALL');

  totalIncome = computed(() =>
    this.incomes().reduce((sum, item) => sum + Number(item.amount || 0), 0)
  );

  constructor() {
    this.loadAllIncome();
  }

  loadAllIncome(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.incomeService.getAllIncome().subscribe({
      next: (response) => {
        this.allIncomes.set(response);
        this.applyFilter();
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading income:', error);
        this.errorMessage.set('उत्पन्न माहिती मिळाली नाही.');
        this.loading.set(false);
      }
    });
  }

  applyFilter(): void {
    const selected = this.selectedType();

    if (selected === 'ALL') {
      this.incomes.set(this.allIncomes());
      return;
    }

    this.incomes.set(
      this.allIncomes().filter(item => item.incomeType === selected)
    );
  }

  onTypeChange(value: string): void {
    this.selectedType.set(value);
    this.applyFilter();
  }

  getIncomeTypeLabel(type: string): string {
    switch (type) {
      case 'MARRIAGE': return 'लग्न समारंभ';
      case 'SMRUTI_DIN': return 'स्मृतीदिन';
      case 'BIRTHDAY': return 'वाढदिवस';
      case 'NAMING_CEREMONY': return 'बारसे / नामकरण';
      case 'MEETING': return 'सभा / मिटिंग';
      case 'HALL_RENT': return 'हॉल भाडे';
      case 'DONATION': return 'देणगी';
      default: return 'इतर';
    }
  }
}