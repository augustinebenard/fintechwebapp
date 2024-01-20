export interface IRole {
  name: string;
  id: number;
}

export interface User {
  id?: string;
  name?: string;
  username?: string;
  email?: string;
  role?: string;
  password?: string;
  active?: boolean;
  createdAt?: string;
  accountNumber?: string;
  walletBalance?: number;
  transactionHistory?: ITransaction[];
}

export interface ITransaction {
  id: string;
  date: string;
  description: string;
  type: string;
  amount: number;
  sender: string;
}
