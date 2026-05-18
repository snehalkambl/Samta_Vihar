import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Income } from '../models/income.model';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/income';

  createIncome(income: Income): Observable<Income> {
    return this.http.post<Income>(this.apiUrl, income);
  }

  getAllIncome(): Observable<Income[]> {
    return this.http.get<Income[]>(this.apiUrl);
  }

  getIncomeById(id: number): Observable<Income> {
    return this.http.get<Income>(`${this.apiUrl}/${id}`);
  }

  getIncomeByType(type: string): Observable<Income[]> {
    return this.http.get<Income[]>(`${this.apiUrl}/type/${type}`);
  }

  deleteIncome(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }
}