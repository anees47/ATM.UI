import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'http://localhost:5262/api/Account';

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
  createAccount(name: string, initialBalance?: number): Observable<string> {
    return this.http.post(this.apiUrl, { name, initialBalance }, {
      responseType: 'text'
    });
  }

  // Delete account
  deleteAccount(id: string): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      responseType: 'text'
    });
  }

  // Deposit money
  deposit(accountId: string, amount: number): Observable<string> {
    const formData = new FormData();
    formData.append('amount', amount.toString());
    return this.http.post(`${this.apiUrl}/${accountId}/deposit`, formData, {
      responseType: 'text'
    });
  }

  // Withdraw money
  withdraw(accountId: string, amount: number): Observable<string> {
    const formData = new FormData();
    formData.append('amount', amount.toString());
    return this.http.post(`${this.apiUrl}/${accountId}/withdraw`, formData, {
      responseType: 'text'
    });
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
