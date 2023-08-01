import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense } from '../models/expense.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  addExpense(expense: Expense): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/payouts`, expense);
  }

  settleUp(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/settleUp`);
  }
}
