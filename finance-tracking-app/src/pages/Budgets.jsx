import React, { useState, useEffect, useContext } from 'react';
import { TransactionContext } from '../store/TransactionContext';

function Budgets() {
  // Load budgets from localStorage or use defaults
  const defaultBudgets = { Groceries: 500, Entertainment: 300, Rent: 1200 };
  const [budgets, setBudgets] = useState(() => {
    const stored = localStorage.getItem('budgets');
    return stored ? JSON.parse(stored) : defaultBudgets;
  });
  
  // Use transaction data to compute spent amounts per category
  const { transactions } = useContext(TransactionContext);
  const getSpent = category =>
    transactions
      .filter(t => t.category === category && t.type === 'Expense')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
  
  const handleBudgetChange = (category, value) => {
    setBudgets(prev => ({ ...prev, [category]: Number(value) }));
  };

  const saveBudgets = () => {
    localStorage.setItem('budgets', JSON.stringify(budgets));
    alert('Budgets saved!');
  };

  return (
    <div className="container my-4">
      <h2>Budgets</h2>
      {Object.keys(budgets).map(category => {
        const limit = budgets[category];
        const spent = getSpent(category);
        const percent = Math.min(100, (spent / limit) * 100);
        return (
          <div key={category} className="mb-3">
            <h5>{category}</h5>
            <div className="progress mb-1">
              <div className="progress-bar" role="progressbar" style={{ width: `${percent}%` }}>
                {Math.round(percent)}%
              </div>
            </div>
            <p>Spent: ${spent.toFixed(2)} of ${limit}</p>
            <div className="input-group mb-3 w-50">
              <span className="input-group-text">Set Limit</span>
              <input 
                type="number" 
                className="form-control" 
                value={limit} 
                onChange={(e) => handleBudgetChange(category, e.target.value)} 
              />
            </div>
          </div>
        );
      })}
      <button className="btn btn-primary" onClick={saveBudgets}>Save Budgets</button>
    </div>
  );
}

export default Budgets;
