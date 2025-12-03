interface userInTransaction {
  email: string;
  name: string;
}

type TransactionType = 'DEPOSIT' | 'TRANSFER' | 'REVERSAL' | 'RECEIVED';
type TransactionStatus = 'COMPLETED' | 'REVERSED';

export interface Transaction {
  id: string;
  status: TransactionStatus;
  type: TransactionType;
  amount: number;
  description?: string;
  createdAt: string;
  toUser: userInTransaction;
  fromUser?: userInTransaction;
  isPositive: boolean;
  reversedTransaction?: {
    id: string;
    amount: number;
    type: TransactionType;
    createdAt: string;
  };
}