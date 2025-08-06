import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:5262/api/transaction';
  private accountApiUrl = 'http://localhost:5262/api/Account';

  constructor(private http: HttpClient) { }

  // Get transactions by account ID
  getTransactionsByAccount(accountId: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/account/${accountId}`);
  }

  // Get all transactions
  getAllTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl);
  }

  // Deposit money to account
  deposit(accountId: string, amount: number): Observable<any> {
    const formData = new FormData();
    formData.append('amount', amount.toString());
    
    return this.http.post(`${this.accountApiUrl}/${accountId}/deposit`, formData);
  }

  // Withdraw money from account
  withdraw(accountId: string, amount: number): Observable<any> {
    const formData = new FormData();
    formData.append('amount', amount.toString());
    
    return this.http.post(`${this.accountApiUrl}/${accountId}/withdraw`, formData);
  }
}
