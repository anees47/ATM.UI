import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css'
})
export class TransactionListComponent implements OnInit {
  accountId?: string;

  transactions: Transaction[] = [];
  loading = false;
  error = '';

  constructor(
    private transactionService: TransactionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.accountId = this.route.snapshot.paramMap.get('accountId') || undefined;
    this.loadTransactions();
  }

  loadTransactions(): void {
    debugger
    if (!this.accountId) return;

    this.loading = true;
    this.error = '';

    this.transactionService.getTransactionsByAccount(this.accountId).subscribe({
      next: (transactions) => {
        this.transactions = transactions;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load transactions';
        this.loading = false;
        console.error('Error loading transactions:', error);
      }
    });
  }

  getTransactionAction(transaction: Transaction): string {
    const type = transaction.transactionType?.toLowerCase();
    switch (type) {
      case 'deposit':
        return 'Deposit';
      case 'withdrawal':
        return 'Withdraw';
      case 'transfer':
        return 'Transfer';
      default:
        return transaction.transactionType || 'Unknown';
    }
  }

  getFromAccount(transaction: Transaction): string {
    const type = transaction.transactionType?.toLowerCase();
    if (type === 'deposit') {
      return 'External';
    }
    return transaction.accountId;
  }

  getToAccount(transaction: Transaction): string {
    const type = transaction.transactionType?.toLowerCase();
    if (type === 'withdrawal') {
      return 'External';
    }
    if (type === 'transfer' && transaction.transferAccountId) {
      return transaction.transferAccountId;
    }
    return transaction.accountId;
  }

  getStatusClass(transaction: Transaction): string {
    return 'status-success';
  }
}
