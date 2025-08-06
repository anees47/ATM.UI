import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-account-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-account-dialog.component.html',
  styleUrl: './create-account-dialog.component.css'
})
export class CreateAccountDialogComponent {
  @Output() accountSubmitted = new EventEmitter<{name: string, initialBalance: number}>();
  @Output() dialogClosed = new EventEmitter<void>();

  accountName: string = '';
  initialBalance: number = 0;
  showDialog = true;

  onSubmit(): void {
    if (this.accountName.trim() && this.initialBalance >= 0) {
      this.accountSubmitted.emit({
        name: this.accountName.trim(),
        initialBalance: this.initialBalance
      });
      this.showDialog = false;
    }
  }

  onCancel(): void {
    this.dialogClosed.emit();
    this.showDialog = false;
  }
}
