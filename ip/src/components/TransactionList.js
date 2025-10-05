import React from 'react';
import TransactionItem from './TransactionItem';

function TransactionList({ transactions, onDelete }) {
  if (transactions.length === 0) {
    return (
      <div className="transaction-list">
        <h2>Recent Transactions</h2>
        <div className="empty-state">
          <p>No transactions yet. Add your first transaction to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="transaction-list">
      <h2>Recent Transactions</h2>
      <div className="transactions">
        {transactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default TransactionList;
