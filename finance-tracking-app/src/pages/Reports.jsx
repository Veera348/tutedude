import React, { useContext } from 'react';
import { TransactionContext } from '../store/TransactionContext';
import MonthlySpendingChart from '../components/Charts/MonthlySpendingChart';
import CategoryPieChart from '../components/Charts/CategoryPieChart';

function Reports() {
  const { transactions } = useContext(TransactionContext);
  
  const monthlySummary = transactions.reduce((acc, t) => {
    const month = t.date.slice(0, 7);
    if (!acc[month]) {
      acc[month] = { Income: 0, Expense: 0 };
    }
    acc[month][t.type] += parseFloat(t.amount);
    return acc;
  }, {});
  
  const months = Object.keys(monthlySummary).sort();

  return (
    <div className="container my-4">
      <h2 className="mb-4" style={{ color: '#2c3e50', fontWeight: 'bold' }}>Reports</h2>
      <h4 style={{ borderBottom: '2px solid #3498db', paddingBottom: '0.5rem' }}>Monthly Financial Summary</h4>
      {months.length > 0 ? (
        <table
          className="table table-bordered"
          style={{ backgroundColor: '#f8f9fa', borderRadius: '5px', overflow: 'hidden' }}
        >
          <thead className="table-light" style={{ backgroundColor: '#3498db', color: 'white' }}>
            <tr>
              <th>Month</th>
              <th>Total Income</th>
              <th>Total Expense</th>
              <th>Net</th>
            </tr>
          </thead>
          <tbody>
            {months.map(month => {
              const income = monthlySummary[month].Income;
              const expense = monthlySummary[month].Expense;
              const net = income - expense;
              return (
                <tr key={month}>
                  <td>{month}</td>
                  <td>${income.toFixed(2)}</td>
                  <td>${expense.toFixed(2)}</td>
                  <td>${net.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No transactions available.</p>
      )}
      <h4 className="mt-4">Monthly Spending Chart</h4>
      <div className="card shadow my-3">
        <div className="card-body p-3" style={{ height: '250px', maxWidth: '600px', margin: 'auto' }}>
          <MonthlySpendingChart />
        </div>
      </div>
      <h4 className="mt-4">Expense Distribution by Category</h4>
      <div className="card shadow my-3">
        <div className="card-body p-3" style={{ height: '250px', maxWidth: '600px', margin: 'auto' }}>
          <CategoryPieChart />
        </div>
      </div>
    </div>
  );
}

export default Reports;