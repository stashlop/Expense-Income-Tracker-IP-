import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddTransactionForm({ onAddTransaction }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: 'expense',
    description: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.description || !formData.amount || !formData.category) {
      alert('Please fill in all fields');
      return;
    }

    const transaction = {
      id: Date.now(),
      type: formData.type,
      description: formData.description,
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: formData.date
    };

    onAddTransaction(transaction);
    
    // Reset form
    setFormData({
      type: 'expense',
      description: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0]
    });

    // Navigate to dashboard
    navigate('/');
  };

  const categories = formData.type === 'income' 
    ? ['Salary', 'Freelance', 'Business', 'Investment', 'Other']
    : ['Food', 'Transportation', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Other'];

  return (
    <form className="add-transaction-form" onSubmit={handleSubmit}>
      <h2>Add Transaction</h2>
      
      <div className="form-group">
        <label>Type</label>
        <div className="radio-group">
          <div className="radio-option">
            <input
              type="radio"
              id="expense"
              name="type"
              value="expense"
              checked={formData.type === 'expense'}
              onChange={handleChange}
            />
            <label htmlFor="expense">Expense</label>
          </div>
          <div className="radio-option">
            <input
              type="radio"
              id="income"
              name="type"
              value="income"
              checked={formData.type === 'income'}
              onChange={handleChange}
            />
            <label htmlFor="income">Income</label>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter description"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="0.00"
          step="0.01"
          min="0"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select a category</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn">
        Add Transaction
      </button>
    </form>
  );
}

export default AddTransactionForm;
