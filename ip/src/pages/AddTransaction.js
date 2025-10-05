import React from 'react';
import AddTransactionForm from '../components/AddTransactionForm';

function AddTransaction({ onAddTransaction }) {
  return (
    <div className="container">
      <AddTransactionForm onAddTransaction={onAddTransaction} />
    </div>
  );
}

export default AddTransaction;
