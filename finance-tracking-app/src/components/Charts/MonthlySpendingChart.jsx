import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import { TransactionContext } from '../../store/TransactionContext';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function MonthlySpendingChart() {
  const { transactions } = useContext(TransactionContext);

  // Aggregate expenses per month (format: YYYY-MM)
  const monthlyExpenses = transactions.reduce((acc, t) => {
    if (t.type === 'Expense') {
      const month = t.date.slice(0, 7);
      acc[month] = (acc[month] || 0) + parseFloat(t.amount);
    }
    return acc;
  }, {});
  
  const labels = Object.keys(monthlyExpenses).sort();
  const data = labels.map(label => monthlyExpenses[label]);
  
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Expenses',
        data,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return <Bar data={chartData} />;
}

export default MonthlySpendingChart;
