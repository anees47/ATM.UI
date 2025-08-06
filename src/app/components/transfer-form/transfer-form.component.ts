import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-transfer-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transfer-form.component.html',
  styleUrl: './transfer-form.component.css'
})
export class TransferFormComponent {
  @Output() transferCompleted = new EventEmitter<void>();
  @Output() dialogClosed = new EventEmitter<void>();

  fromAccountId = '';
  toAccountId = '';
  amount = 0;
  showDialog = true;
  isLoading = false;
  errorMessage = '';

  constructor(private accountService: AccountService) {}

  onSubmit(): void {
    if (this.fromAccountId && this.toAccountId && this.amount > 0) {
      this.isLoading = true;
      this.errorMessage = '';
      
      this.accountService.transfer(this.fromAccountId, this.toAccountId, this.amount)
        .subscribe({
          next: () => {
            this.transferCompleted.emit();
            this.showDialog = false;
            this.isLoading = false;
          },
          error: (error) => {
            this.errorMessage = 'Transfer failed. Please try again.';
            this.isLoading = false;
          }
        });
    }
  }

  onCancel(): void {
    this.dialogClosed.emit();
    this.showDialog = false;
  }
}
