import { createContext, useEffect, useState } from "react";

import { TransactionType } from "./transaction";

interface TransactionContextTypeProps {
  transactions: TransactionType[];
  handleAddNewTransaction: (transaction: TransactionType) => void;
}

export const TransactionContext = createContext<TransactionContextTypeProps>({ } as TransactionContextTypeProps);

interface TransactionContextProviderProps {
  children: React.ReactNode;
}

export function TransactionProvider({ children }: TransactionContextProviderProps) {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  useEffect(() => {
    async function loadTransactions() {
      const response = await fetch('http://localhost:3333/transactions');
      const data = await response.json();

      setTransactions(data);
    }

    loadTransactions();
  }, []);

  const handleAddNewTransaction = (transaction: TransactionType) => {
    setTransactions(prev => [...prev, transaction]);
  };

  return (
    <TransactionContext.Provider value={{ transactions, handleAddNewTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
}
