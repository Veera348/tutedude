import React, { createContext, useState, useEffect } from 'react';

export const TransactionContext = createContext();

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('transactions');
    if (stored) setTransactions(JSON.parse(stored));
  }, []);

  // Save to localStorage on update
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = transaction => {
    const newTransaction = { id: Date.now(), ...transaction };
    setTransactions(prev => [...prev, newTransaction]);
  };

  const deleteTransaction = id => setTransactions(prev => prev.filter(t => t.id !== id));

  const updateTransaction = updatedTransaction => {
    setTransactions(prev =>
      prev.map(t => (t.id === updatedTransaction.id ? updatedTransaction : t))
    );
  };

  return (
    <TransactionContext.Provider
      value={{ transactions, addTransaction, deleteTransaction, updateTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
