import React, { useContext } from 'react';
import { TransactionContext } from '../store/TransactionContext';
import MonthlySpendingChart from '../components/Charts/MonthlySpendingChart';
import CategoryPieChart from '../components/Charts/CategoryPieChart';

function Dashboard() {
  const { transactions } = useContext(TransactionContext);

  // Compute aggregate stats from transactions
  const totalIncome = transactions
    .filter(t => t.type === 'Income')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'Expense')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const remainingBudget = totalIncome - totalExpenses;
  const savings = remainingBudget > 0 ? remainingBudget : 0;

  return (
    <div className="container my-4">
      <h2 className="mb-4">Dashboard</h2>
      <div className="row">
        {/* Stats Cards */}
        <div className="col-md-3 mb-3">
          <div className="card text-white bg-success shadow">
            <div className="card-body">
              <h5 className="card-title">Total Income</h5>
              <p className="card-text fs-4">${totalIncome.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-white bg-danger shadow">
            <div className="card-body">
              <h5 className="card-title">Total Expenses</h5>
              <p className="card-text fs-4">${totalExpenses.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-dark bg-warning shadow">
            <div className="card-body">
              <h5 className="card-title">Remaining Budget</h5>
              <p className="card-text fs-4">${remainingBudget.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-white bg-info shadow">
            <div className="card-body">
              <h5 className="card-title">Savings</h5>
              <p className="card-text fs-4">${savings.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
      {/* New visualization: Monthly Spending Trends */}
      <h3 className="mt-4">Monthly Spending Trends</h3>
      <div className="card shadow my-3">
        <div className="card-body" style={{ height: '250px', maxWidth: '600px', margin: 'auto' }}>
          <MonthlySpendingChart />
        </div>
      </div>
      {/* New visualization: Expense Breakdown */}
      <h3 className="mt-4">Category-wise Expense Breakdown</h3>
      <div className="card shadow my-3">
        <div className="card-body" style={{ height: '250px', maxWidth: '600px', margin: 'auto' }}>
          <CategoryPieChart />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;