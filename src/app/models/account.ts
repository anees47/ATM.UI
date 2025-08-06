import { Transaction } from './transaction';

export interface Account {
  id: string;
  name: string;
  balance: number;
  transactions?: Transaction[];
}
