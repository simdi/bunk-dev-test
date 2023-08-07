import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIRequestResponse, Expense } from '../models/expense.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  settleUp(data: { expenses: Array<Expense> }): Observable<APIRequestResponse> {
    return this.http.post<APIRequestResponse>(`${this.apiUrl}/payouts`, data);
  }
}
