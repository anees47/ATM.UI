export interface Transaction {
  id: string;
  accountId: string;
  amount: number;
  timestamp: string;
  transactionType: string;
  transferAccountId?: string;
}
