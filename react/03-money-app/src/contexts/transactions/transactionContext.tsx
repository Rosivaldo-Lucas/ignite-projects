import { createContext, useEffect, useState } from "react";

import { TransactionType } from "./transaction";
import { api } from "../../lib/axios";

interface TransactionContextTypeProps {
  transactions: TransactionType[];
  fetchTransactions: (query?: string) => Promise<void>;
  handleAddNewTransaction: (transaction: TransactionType) => void;
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

  async function fetchTransactions(query?: string) {
    const response = await api.get('/transactions', {
      params: {
        q: query,
      }
    })

    setTransactions(response.data);
  }

  const handleAddNewTransaction = (transaction: TransactionType) => {
    setTransactions(prev => [...prev, transaction]);
  };

  return (
    <TransactionContext.Provider value={{ transactions, fetchTransactions, handleAddNewTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
}
