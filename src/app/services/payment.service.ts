import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment } from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/payments';

  createPayment(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(this.apiUrl, payment);
  }

  getAllPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.apiUrl);
  }

  getPaymentById(id: number): Observable<Payment> {
    return this.http.get<Payment>(`${this.apiUrl}/${id}`);
  }

  getPaymentsByEventId(eventId: number): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.apiUrl}/event/${eventId}`);
  }

  getPaymentsByMembershipId(membershipId: number): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.apiUrl}/membership/${membershipId}`);
  }

  getPaymentsByType(paymentType: string): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.apiUrl}/type/${paymentType}`);
  }
}