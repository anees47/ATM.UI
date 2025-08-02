import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { Account } from '../../models/account';
import { CreateAccountDialogComponent } from '../create-account-dialog/create-account-dialog.component';

@Component({
  selector: 'app-account-list',
  standalone: true,
  imports: [CommonModule, CreateAccountDialogComponent],
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.css'
})
export class AccountListComponent implements OnInit {
  accounts: Account[] = [];
  loading = false;
  error = '';
  success = '';
  showCreateDialog = false;

  constructor(
    private accountService: AccountService,
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

  onBalanceSubmitted(initialBalance: number): void {
    this.showCreateDialog = false;
    this.loading = true;
    this.error = '';
    this.success = '';

    this.accountService.createAccount(initialBalance).subscribe({
      next: (response) => {
        console.log('Account created successfully:', response);
        this.success = `Account created successfully with initial balance of $${initialBalance}!`;
        this.clearSuccessMessage();
        this.loadAccounts(); // Reload the list
      },
      error: (error) => {
        console.error('Error creating account:', error);
        this.error = error.status === 400
          ? 'Invalid initial balance amount'
          : 'Failed to create account. Please try again.';
        this.loading = false;
      }
    });
  }

  onDialogClosed(): void {
    this.showCreateDialog = false;
  }

  deleteAccount(accountId: string): void {
    if (confirm('Are you sure you want to delete this account?')) {
      this.loading = true;
      this.error = '';
      this.success = '';

      this.accountService.deleteAccount(accountId).subscribe({
        next: (response) => {
          console.log('Account deleted successfully:', response);
          this.success = 'Account deleted successfully!';
          this.clearSuccessMessage();
          this.loadAccounts(); // Reload the list
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
    this.router.navigate(['/transfer']);
  }
}
