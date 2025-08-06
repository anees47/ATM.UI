import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { AccountFormatterService } from '../../services/account-formatter.service';
import { Account } from '../../models/account';
import { CreateAccountDialogComponent } from '../create-account-dialog/create-account-dialog.component';
import { TransferFormComponent } from '../transfer-form/transfer-form.component';
import { DepositWithdrawFormComponent } from '../deposit-withdraw-form/deposit-withdraw-form.component';
import { CurrencyDirective } from '../../directives/currency.directive';

@Component({
  selector: 'app-account-list',
  standalone: true,
  imports: [CommonModule, CreateAccountDialogComponent, TransferFormComponent, DepositWithdrawFormComponent, CurrencyDirective],
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.css'
})
export class AccountListComponent implements OnInit {
  accounts: Account[] = [];
  loading = false;
  error = '';
  success = '';
  showCreateDialog = false;
  showTransferDialog = false;
  showDepositWithdrawDialog = false;
  operationType: 'deposit' | 'withdraw' = 'deposit';
  selectedAccountId = '';

  constructor(
    private accountService: AccountService,
    private accountFormatter: AccountFormatterService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts(): void {
    this.loading = true;
    this.error = '';
    this.success = '';

    this.accountService.getAccounts().subscribe({
      next: (accounts) => {
        this.accounts = accounts;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load accounts';
        this.loading = false;
        console.error('Error loading accounts:', error);
      }
    });
  }

  createAccount(): void {
    this.showCreateDialog = true;
  }

  onAccountSubmitted(accountData: {name: string, initialBalance: number}): void {
    this.showCreateDialog = false;
    this.loading = true;
    this.error = '';
    this.success = '';

    this.accountService.createAccount(accountData.name, accountData.initialBalance).subscribe({
      next: (response) => {
        console.log('Account created successfully:', response);
        this.success = `Account "${accountData.name}" created successfully with initial balance of $${accountData.initialBalance}!`;
        this.loading = false;
        this.clearSuccessMessage();
        this.loadAccounts(); // Reload the list
      },
      error: (error) => {

        console.error('Error creating account:', error);
        this.error = error.status === 400
          ? 'Invalid account data'
          : 'Failed to create account. Please try again.';
        this.loading = false;
      }
    });
  }

  onDialogClosed(): void {
    this.showCreateDialog = false;
  }

  confirmDelete(accountId: string): void {
    if (confirm('Are you sure you want to delete this account? This action cannot be undone.')) {
      this.deleteAccount(accountId);
    }
  }

  deleteAccount(accountId: string): void {
    this.loading = true;
    this.error = '';
    this.success = '';

    this.accountService.deleteAccount(accountId).subscribe({
      next: (response) => {
        console.log('Account deleted successfully:', response);
        this.success = 'Account deleted successfully!';
        this.loading = false;
        this.clearSuccessMessage();
        this.loadAccounts();
      },
      error: (error) => {
        console.error('Error deleting account:', error);
        this.error = error.status === 404
          ? 'Account not found'
          : error.status === 400
          ? 'Cannot delete account with balance'
          : 'Failed to delete account. Please try again.';
        this.loading = false;
      }
    });
  }

  private clearSuccessMessage(): void {
    setTimeout(() => {
      this.success = '';
    }, 3000); // Clear success message after 3 seconds
  }

  viewAccount(accountId: string): void {
    this.router.navigate(['/account', accountId]);
  }

  viewTransactions(accountId: string): void {
    this.router.navigate(['/transactions', accountId]);
  }

  goToTransfer(): void {
    this.showTransferDialog = true;
  }

  onTransferCompleted(): void {
    this.showTransferDialog = false;
    this.success = 'Transfer completed successfully!';
    this.clearSuccessMessage();
    this.loadAccounts();
  }

  onTransferDialogClosed(): void {
    this.showTransferDialog = false;
  }

  deposit(accountId: string): void {
    this.selectedAccountId = accountId;
    this.operationType = 'deposit';
    this.showDepositWithdrawDialog = true;
  }

  withdraw(accountId: string): void {
    this.selectedAccountId = accountId;
    this.operationType = 'withdraw';
    this.showDepositWithdrawDialog = true;
  }

  onDepositWithdrawCompleted(): void {
    this.showDepositWithdrawDialog = false;
    this.success = `${this.operationType === 'deposit' ? 'Deposit' : 'Withdrawal'} completed successfully!`;
    this.clearSuccessMessage();
    this.loadAccounts();
  }

  onDepositWithdrawDialogClosed(): void {
    this.showDepositWithdrawDialog = false;
  }

  formatAccountNumber(accountId: string): string {
    return this.accountFormatter.formatAccountNumber(accountId);
  }
}
