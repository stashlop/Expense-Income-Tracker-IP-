import React from 'react';

function Reports({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  // Group transactions by category
  const incomeByCategory = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const expenseByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  return (
    <div className="reports">
      <h2>Financial Reports</h2>

      <div className="report-section">
        <h3>Summary</h3>
        <div className="balance-summary">
          <div className="balance-card total">
            <h3>Net Balance</h3>
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
      </div>

      <div className="report-section">
        <h3>Income by Category</h3>
        {Object.keys(incomeByCategory).length > 0 ? (
          Object.entries(incomeByCategory).map(([category, amount]) => (
            <div key={category} className="category-item">
              <span>{category}</span>
              <span>${amount.toFixed(2)}</span>
            </div>
          ))
        ) : (
          <p>No income transactions yet.</p>
        )}
      </div>

      <div className="report-section">
        <h3>Expenses by Category</h3>
        {Object.keys(expenseByCategory).length > 0 ? (
          Object.entries(expenseByCategory)
            .sort((a, b) => b[1] - a[1])
            .map(([category, amount]) => (
              <div key={category} className="category-item">
                <span>{category}</span>
                <span>${amount.toFixed(2)}</span>
              </div>
            ))
        ) : (
          <p>No expense transactions yet.</p>
        )}
      </div>

      <div className="report-section">
        <h3>Transaction History</h3>
        <p>Total Transactions: {transactions.length}</p>
        <p>Income Transactions: {transactions.filter(t => t.type === 'income').length}</p>
        <p>Expense Transactions: {transactions.filter(t => t.type === 'expense').length}</p>
      </div>
    </div>
  );
}

export default Reports;
