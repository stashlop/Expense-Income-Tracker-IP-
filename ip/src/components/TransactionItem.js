import React from 'react';

function TransactionItem({ transaction, onDelete }) {
  const handleDelete = () => {
    // Add fade-out animation before deleting
    const element = document.getElementById(`transaction-${transaction.id}`);
    if (element) {
      element.classList.add('fade-out');
      setTimeout(() => {
        onDelete(transaction.id);
      }, 300);
    } else {
      onDelete(transaction.id);
    }
  };

  return (
    <div 
      id={`transaction-${transaction.id}`}
      className={`transaction-item ${transaction.type}`}
    >
      <div className="transaction-info">
        <h4>{transaction.description}</h4>
        <p>
          {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
        </p>
      </div>
      <div className="transaction-amount">
        <span className={`amount ${transaction.type}`}>
          {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
        </span>
        <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TransactionItem;
