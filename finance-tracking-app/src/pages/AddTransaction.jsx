import React, { useContext } from 'react';
import { TransactionContext } from '../store/TransactionContext';

function AddTransaction() {
  const { addTransaction } = useContext(TransactionContext);
  const [transaction, setTransaction] = React.useState({
    type: '',
    amount: '',
    category: '',
    date: '',
    description: ''
  });
  const [errors, setErrors] = React.useState({});

  const handleChange = e => {
    const { name, value } = e.target;
    setTransaction(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errs = {};
    if (!transaction.type) errs.type = 'Type is required';
    if (!transaction.amount || isNaN(transaction.amount)) errs.amount = 'Valid amount is required';
    if (!transaction.category) errs.category = 'Category is required';
    if (!transaction.date) errs.date = 'Date is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      addTransaction(transaction);
      setTransaction({ type: '', amount: '', category: '', date: '', description: '' });
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Transaction Type</label>
          <select className="form-select" name="type" value={transaction.type} onChange={handleChange}>
            <option value="">Select type</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
          {errors.type && <div className="text-danger">{errors.type}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Amount</label>
          <input type="number" className="form-control" name="amount" value={transaction.amount} onChange={handleChange} />
          {errors.amount && <div className="text-danger">{errors.amount}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select className="form-select" name="category" value={transaction.category} onChange={handleChange}>
            <option value="">Select category</option>
            <option value="Groceries">Groceries</option>
            <option value="Salary">Salary</option>
            <option value="Rent">Rent</option>
            <option value="Entertainment">Entertainment</option>
          </select>
          {errors.category && <div className="text-danger">{errors.category}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Date</label>
          <input type="date" className="form-control" name="date" value={transaction.date} onChange={handleChange} />
          {errors.date && <div className="text-danger">{errors.date}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Description (optional)</label>
          <textarea className="form-control" name="description" value={transaction.description} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Add Transaction</button>
      </form>
    </div>
  );
}

export default AddTransaction;
