import React, { useContext } from 'react';
import { Pie } from 'react-chartjs-2';
import { TransactionContext } from '../../store/TransactionContext';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function CategoryPieChart() {
  const { transactions } = useContext(TransactionContext);

  // Aggregate expenses by category
  const categoryTotals = transactions.reduce((acc, t) => {
    if (t.type === 'Expense') {
      acc[t.category] = (acc[t.category] || 0) + parseFloat(t.amount);
    }
    return acc;
  }, {});
  
  const labels = Object.keys(categoryTotals);
  const data = labels.map(label => categoryTotals[label]);

  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
      },
    ],
  };

  return <Pie data={chartData} />;
}

export default CategoryPieChart;
