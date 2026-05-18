import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';
import { IncomeService } from '../../services/income.service';
import { ExpenseService } from '../../services/expense.service';
import { Income } from '../../models/income.model';
import { Expense } from '../../models/expense.model';

@Component({
  selector: 'app-finance-summary',
  standalone: true,
  imports: [CommonModule],
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
    this.incomes().reduce((sum, item) => sum + Number(item.amount || 0), 0)
  );

  totalExpense = computed(() =>
    this.expenses().reduce((sum, item) => sum + Number(item.amount || 0), 0)
  );

  balance = computed(() => this.totalIncome() - this.totalExpense());

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

    // Title
    worksheet.mergeCells('A1:I1');
    const titleCell = worksheet.getCell('A1');
    titleCell.value = 'समता बुद्धविहार - आर्थिक अहवाल';
    titleCell.font = { size: 16, bold: true, color: { argb: 'FFFFFFFF' } };
    titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
    titleCell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '2F4A9A' }
    };
    worksheet.getRow(1).height = 26;

    // Summary heading
    worksheet.mergeCells('A3:C3');
    const summaryHeader = worksheet.getCell('A3');
    summaryHeader.value = 'आर्थिक सारांश';
    summaryHeader.font = { bold: true, size: 13, color: { argb: 'FFFFFFFF' } };
    summaryHeader.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '1F3475' }
    };
    summaryHeader.alignment = { horizontal: 'center', vertical: 'middle' };

    const summaryRows = [
      ['Total Income', this.totalIncome()],
      ['Total Expense', this.totalExpense()],
      ['Remaining Balance', this.balance()]
    ];

    let rowIndex = 4;
    summaryRows.forEach((item, index) => {
      const row = worksheet.getRow(rowIndex + index);
      row.getCell(1).value = item[0];
      row.getCell(2).value = item[1] as number;

      row.getCell(1).font = { bold: true };
      row.getCell(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'EAF0FF' }
      };
      row.getCell(2).numFmt = '₹#,##0';
      row.eachCell((cell) => {
        cell.border = this.getBorder();
      });
    });

    // Income section
    let startIncomeRow = 9;
    worksheet.mergeCells(`A${startIncomeRow}:I${startIncomeRow}`);
    const incomeHeader = worksheet.getCell(`A${startIncomeRow}`);
    incomeHeader.value = 'Income List';
    incomeHeader.font = { bold: true, size: 13, color: { argb: 'FFFFFFFF' } };
    incomeHeader.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '2F9A48' }
    };
    incomeHeader.alignment = { horizontal: 'center', vertical: 'middle' };

    const incomeTableHeaderRow = worksheet.getRow(startIncomeRow + 1);
    const incomeHeaders = [
      'ID',
      'Income Type',
      'Person Name',
      'Mobile',
      'Description',
      'Amount',
      'Income Date',
      'Payment Mode',
      'Remarks'
    ];
    incomeHeaders.forEach((header, index) => {
      const cell = incomeTableHeaderRow.getCell(index + 1);
      cell.value = header;
      this.applyTableHeaderStyle(cell);
    });

    this.incomes().forEach((income, idx) => {
      const row = worksheet.getRow(startIncomeRow + 2 + idx);
      row.values = [
        income.id ?? '',
        income.incomeType ?? '',
        income.personName ?? '',
        income.mobile ?? '',
        income.description ?? '',
        Number(income.amount ?? 0),
        income.incomeDate ?? '',
        income.paymentMode ?? '',
        income.remarks ?? ''
      ];

      row.getCell(6).numFmt = '₹#,##0';
      this.applyDataRowStyle(row, idx);
    });

    // Expense section
    const startExpenseRow = startIncomeRow + 4 + this.incomes().length;
    worksheet.mergeCells(`A${startExpenseRow}:I${startExpenseRow}`);
    const expenseHeader = worksheet.getCell(`A${startExpenseRow}`);
    expenseHeader.value = 'Expense List';
    expenseHeader.font = { bold: true, size: 13, color: { argb: 'FFFFFFFF' } };
    expenseHeader.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'D04A3A' }
    };
    expenseHeader.alignment = { horizontal: 'center', vertical: 'middle' };

    const expenseTableHeaderRow = worksheet.getRow(startExpenseRow + 1);
    const expenseHeaders = [
      'ID',
      'Expense Type',
      'Person Name',
      'Mobile',
      'Description',
      'Amount',
      'Expense Date',
      'Payment Mode',
      'Remarks'
    ];
    expenseHeaders.forEach((header, index) => {
      const cell = expenseTableHeaderRow.getCell(index + 1);
      cell.value = header;
      this.applyTableHeaderStyle(cell);
    });

    this.expenses().forEach((expense, idx) => {
      const row = worksheet.getRow(startExpenseRow + 2 + idx);
      row.values = [
        expense.id ?? '',
        expense.expenseType ?? '',
        expense.personName ?? '',
        expense.mobile ?? '',
        expense.description ?? '',
        Number(expense.amount ?? 0),
        expense.expenseDate ?? '',
        expense.paymentMode ?? '',
        expense.remarks ?? ''
      ];

      row.getCell(6).numFmt = '₹#,##0';
      this.applyDataRowStyle(row, idx);
    });

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), 'finance-report.xlsx');
  }

  private applyTableHeaderStyle(cell: ExcelJS.Cell): void {
    cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '2F4A9A' }
    };
    cell.border = this.getBorder();
  }

  private applyDataRowStyle(row: ExcelJS.Row, index: number): void {
    row.eachCell((cell) => {
      cell.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };
      cell.border = this.getBorder();

      if (index % 2 === 0) {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'F8FAFF' }
        };
      }
    });
  }

  private getBorder(): Partial<ExcelJS.Borders> {
    return {
      top: { style: 'thin', color: { argb: 'D9E2F2' } },
      left: { style: 'thin', color: { argb: 'D9E2F2' } },
      bottom: { style: 'thin', color: { argb: 'D9E2F2' } },
      right: { style: 'thin', color: { argb: 'D9E2F2' } }
    };
  }
}