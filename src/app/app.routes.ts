import { Routes } from '@angular/router';
import { AccountListComponent } from './components/account-list/account-list.component';
import { AccountDetailComponent } from './components/account-detail/account-detail.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { TransferFormComponent } from './components/transfer-form/transfer-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/accounts', pathMatch: 'full' },
  { path: 'accounts', component: AccountListComponent },
  { path: 'account/:id', component: AccountDetailComponent },
  { path: 'transactions/:accountId', component: TransactionListComponent },
  { path: 'transfer', component: TransferFormComponent }
];
