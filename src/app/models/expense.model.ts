export interface Expense {
  id?: number;
  expenseType: string;
  personName: string;
  mobile?: string;
  description?: string;
  amount: number;
  expenseDate: string;
  paymentMode?: string;
  remarks?: string;
}