import { createContext, useEffect, useState } from "react";

import { TransactionType } from "./transaction";
import { api } from "../../lib/axios";

interface CreateTransactionInput {
  description: string;
  price: number;
  category: string;
  type: 'income' | 'outcome';
}

interface TransactionContextTypeProps {
  transactions: TransactionType[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (transaction: CreateTransactionInput) => Promise<void>;
}

export const TransactionContext = createContext<TransactionContextTypeProps>({ } as TransactionContextTypeProps);

interface TransactionContextProviderProps {
  children: React.ReactNode;
}

export function TransactionProvider({ children }: TransactionContextProviderProps) {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function createTransaction(input: CreateTransactionInput) {
    const { description, price, category, type } = input;
    
    const newTransaction = await api.post('/transactions', {
      description,
      price,
      category,
      type,
      createdAt: new Date(),
    });

    setTransactions(state => [newTransaction.data, ...state]);
  }

  async function fetchTransactions(query?: string) {
    const response = await api.get('/transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      }
    })

    setTransactions(response.data);
  }

  return (
    <TransactionContext.Provider value={{ transactions, fetchTransactions, createTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
}
