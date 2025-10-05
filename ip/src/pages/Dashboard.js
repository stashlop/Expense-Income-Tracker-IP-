import React from 'react';
import TransactionList from '../components/TransactionList';

function Dashboard({ transactions, onDelete }) {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      
      <div className="balance-summary">
        <div className="balance-card total">
          <h3>Total Balance</h3>
          <p>${balance.toFixed(2)}</p>
        </div>
        <div className="balance-card income">
          <h3>Total Income</h3>
          <p>${totalIncome.toFixed(2)}</p>
        </div>
        <div className="balance-card expense">
          <h3>Total Expenses</h3>
          <p>${totalExpense.toFixed(2)}</p>
        </div>
      </div>

      <TransactionList transactions={transactions} onDelete={onDelete} />
    </div>
  );
}

export default Dashboard;
