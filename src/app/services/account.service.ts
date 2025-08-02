import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'https://localhost:7096/api/account';

  constructor(private http: HttpClient) { }

  // Get all accounts
  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.apiUrl);
  }

  // Get account by ID
  getAccount(id: string): Observable<Account> {
    return this.http.get<Account>(`${this.apiUrl}/${id}`);
  }

  // Create new account
  createAccount(initialBalance?: number): Observable<any> {
    return this.http.post(this.apiUrl, { initialBalance });
  }

  // Delete account
  deleteAccount(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Deposit money
  deposit(accountId: string, amount: number): Observable<any> {
    const formData = new FormData();
    formData.append('amount', amount.toString());
    return this.http.post(`${this.apiUrl}/${accountId}/deposit`, formData);
  }

  // Withdraw money
  withdraw(accountId: string, amount: number): Observable<any> {
    const formData = new FormData();
    formData.append('amount', amount.toString());
    return this.http.post(`${this.apiUrl}/${accountId}/withdraw`, formData);
  }

  // Transfer money between accounts
  transfer(fromAccountId: string, toAccountId: string, amount: number): Observable<any> {
    const formData = new FormData();
    formData.append('fromAccountId', fromAccountId);
    formData.append('toAccountId', toAccountId);
    formData.append('amount', amount.toString());
    return this.http.post(`${this.apiUrl}/transfer`, formData);
  }
}
