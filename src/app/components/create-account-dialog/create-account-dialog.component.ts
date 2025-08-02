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
  @Output() balanceSubmitted = new EventEmitter<number>();
  @Output() dialogClosed = new EventEmitter<void>();

  initialBalance: number = 0;
  showDialog = true;

  onSubmit(): void {
    if (this.initialBalance >= 0) {
      this.balanceSubmitted.emit(this.initialBalance);
      this.showDialog = false;
    }
  }

  onCancel(): void {
    this.dialogClosed.emit();
    this.showDialog = false;
  }
}
