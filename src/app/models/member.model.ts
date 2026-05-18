export interface Member {
  id?: number;
  fullName: string;
  mobile: string;
  address: string;
  paymentStatus: string;
  paymentMode: string;
  transactionId?: string;
}