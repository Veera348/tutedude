import React, { useContext } from 'react';
import { TransactionContext } from '../store/TransactionContext';

function TransactionHistory() {
  const { transactions, deleteTransaction } = useContext(TransactionContext);

  return (
    <div className="container my-4">
      <h2 className="mb-4">Transaction History</h2>
      <table className="table table-striped table-hover table-bordered">
        <thead className="table-light">
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(tx => (
            <tr key={tx.id}>
              <td>{tx.date}</td>
              <td>{tx.category}</td>
              <td>${tx.amount}</td>
              <td>{tx.type}</td>
              <td>{tx.description}</td>
              <td>
                {/* Edit functionality can be added similarly */}
                <button className="btn btn-sm btn-danger" onClick={() => deleteTransaction(tx.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionHistory;