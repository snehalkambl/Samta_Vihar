export interface Payment {
  id?: number;
  payerName: string;
  mobile: string;
  paymentType: string;
  amount: number;
  paymentMode: string;
  paymentDate?: string;
  transactionId?: string;
  status: string;
  eventId?: number | null;
  membershipId?: number | null;
  remarks?: string;
}