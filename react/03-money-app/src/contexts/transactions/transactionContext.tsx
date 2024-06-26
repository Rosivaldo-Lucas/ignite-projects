import { createContext, useEffect, useState } from "react";

import { TransactionType } from "./transaction";

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
    const url = new URL('http://localhost:3333/transactions');

    if (query) {
      url.searchParams.append('q', query);
    }

    const response = await fetch(url);
    const data = await response.json();

    setTransactions(data);
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
