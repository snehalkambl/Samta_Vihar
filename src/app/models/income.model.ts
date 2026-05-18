export interface Income {
  id?: number;
  incomeType: string;
  personName: string;
  mobile?: string;
  description?: string;
  amount: number;
  incomeDate: string;
  paymentMode?: string;
  remarks?: string;
}