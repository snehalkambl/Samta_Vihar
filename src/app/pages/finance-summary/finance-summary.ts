import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';
import { IncomeService } from '../../services/income.service';
import { ExpenseService } from '../../services/expense.service';
import { Income } from '../../models/income.model';
import { Expense } from '../../models/expense.model';
import { TranslatePipe } from '../../pipes/translate-pipe';

@Component({
  selector: 'app-finance-summary',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './finance-summary.html',
  styleUrl: './finance-summary.css'
})
export class FinanceSummaryComponent {
  private incomeService = inject(IncomeService);
  private expenseService = inject(ExpenseService);

  incomes = signal<Income[]>([]);
  expenses = signal<Expense[]>([]);
  loading = signal(true);
  errorMessage = signal('');

  totalIncome = computed(() =>
    this.incomes().reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0
    )
  );

  totalExpense = computed(() =>
    this.expenses().reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0
    )
  );

  balance = computed(() =>
    this.totalIncome() - this.totalExpense()
  );

  constructor() {
    this.loadData();
  }

  loadData(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.incomeService.getAllIncome().subscribe({
      next: (incomeResponse) => {
        this.incomes.set(incomeResponse);

        this.expenseService.getAllExpenses().subscribe({
          next: (expenseResponse) => {
            this.expenses.set(expenseResponse);
            this.loading.set(false);
          },
          error: (error) => {
            console.error('Expense load failed:', error);
            this.errorMessage.set('खर्च माहिती मिळाली नाही.');
            this.loading.set(false);
          }
        });
      },
      error: (error) => {
        console.error('Income load failed:', error);
        this.errorMessage.set('उत्पन्न माहिती मिळाली नाही.');
        this.loading.set(false);
      }
    });
  }

  async downloadFinanceExcel(): Promise<void> {
    const workbook = new ExcelJS.Workbook();

    const worksheet = workbook.addWorksheet('Finance Report', {
      properties: { defaultRowHeight: 22 }
    });

    worksheet.columns = [
      { width: 10 },
      { width: 22 },
      { width: 22 },
      { width: 18 },
      { width: 32 },
      { width: 14 },
      { width: 16 },
      { width: 18 },
      { width: 22 }
    ];

    worksheet.mergeCells('A1:I1');

    const titleCell = worksheet.getCell('A1');

    titleCell.value = 'समता बुद्धविहार - आर्थिक अहवाल';

    titleCell.font = {
      size: 16,
      bold: true,
      color: { argb: 'FFFFFFFF' }
    };

    titleCell.alignment = {
      horizontal: 'center',
      vertical: 'middle'
    };

    titleCell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '2F4A9A' }
    };

    worksheet.getRow(1).height = 26;

    const buffer = await workbook.xlsx.writeBuffer();

    saveAs(
      new Blob([buffer]),
      'finance-report.xlsx'
    );
  }
}