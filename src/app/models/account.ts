import { Transaction } from './transaction';

export interface Account {
  id: string;
  balance: number;
  transactions?: Transaction[];
}
