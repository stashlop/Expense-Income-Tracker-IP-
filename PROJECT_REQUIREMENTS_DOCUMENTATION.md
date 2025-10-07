# 📋 PROJECT REQUIREMENTS DOCUMENTATION

## Expense & Income Tracker Application

---

## 📌 PROJECT OVERVIEW

**Project Name**: Expense and Income Tracker  
**Technology**: React 18 with React Router v6  
**Purpose**: Track personal expenses and income with real-time updates and animations  
**Date**: October 2025

---

## 🎯 PROJECT REQUIREMENTS

### 1️⃣ **STATE & PROPS MANAGEMENT**

#### Requirements:
- ✅ Use React `useState` to manage transactions
- ✅ Use React `useEffect` for side effects (localStorage)
- ✅ Pass data via props between components
- ✅ Lift state up to parent component

#### Implementation:

**State Management in App.js:**
```javascript
import React, { useState, useEffect } from 'react';

function App() {
  // State to store all transactions
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : [];
  });

  // Effect to persist transactions to localStorage
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Handler to add new transaction
  const handleAddTransaction = (transaction) => {
    setTransactions(prev => [transaction, ...prev]);
  };

  // Handler to delete transaction
  const handleDeleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  return (
    // Router setup with components receiving props
  );
}
```

**Props Flow:**
```
App.js (Parent - State Owner)
  ├── transactions: Array
  ├── handleAddTransaction: Function
  └── handleDeleteTransaction: Function
      |
      ├─→ Dashboard Component
      │     ├─ receives: transactions, onDelete
      │     └─→ TransactionList Component
      │           ├─ receives: transactions, onDelete
      │           └─→ TransactionItem Component
      │                 └─ receives: transaction, onDelete
      │
      ├─→ AddTransaction Component
      │     ├─ receives: onAddTransaction
      │     └─→ AddTransactionForm Component
      │           └─ receives: onAddTransaction
      │
      └─→ Reports Component
            └─ receives: transactions
```

---

### 2️⃣ **REUSABLE COMPONENTS**

#### Component 1: TransactionList

**Purpose**: Display a list of all transactions  
**Location**: `src/components/TransactionList.js`

**Props:**
- `transactions` (Array) - List of transaction objects
- `onDelete` (Function) - Handler for deleting transactions

**Code:**
```javascript
import React from 'react';
import TransactionItem from './TransactionItem';

function TransactionList({ transactions, onDelete }) {
  // Empty state when no transactions
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
```

**Features:**
- ✅ Receives transactions array via props
- ✅ Maps through array to render TransactionItem components
- ✅ Handles empty state
- ✅ Passes delete handler to children

---

#### Component 2: TransactionItem

**Purpose**: Display individual transaction with delete button  
**Location**: `src/components/TransactionItem.js`

**Props:**
- `transaction` (Object) - Single transaction with id, type, description, amount, category, date
- `onDelete` (Function) - Handler to delete this transaction

**Code:**
```javascript
import React from 'react';

function TransactionItem({ transaction, onDelete }) {
  const handleDelete = () => {
    // Add fade-out animation before deleting
    const element = document.getElementById(`transaction-${transaction.id}`);
    if (element) {
      element.classList.add('fade-out');
      setTimeout(() => {
        onDelete(transaction.id);
      }, 300); // Wait for animation to complete
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
```

**Features:**
- ✅ Color-coded by transaction type (income = green, expense = red)
- ✅ Displays all transaction details
- ✅ Delete button with animation
- ✅ Formatted date and currency

---

#### Component 3: AddTransactionForm

**Purpose**: Form to add new income or expense transactions  
**Location**: `src/components/AddTransactionForm.js`

**Props:**
- `onAddTransaction` (Function) - Handler to add transaction to state

**Code:**
```javascript
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddTransactionForm({ onAddTransaction }) {
  const navigate = useNavigate();
  
  // Local state for form inputs
  const [formData, setFormData] = useState({
    type: 'expense',
    description: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0]
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.description || !formData.amount || !formData.category) {
      alert('Please fill in all fields');
      return;
    }

    // Create transaction object
    const transaction = {
      id: Date.now(),
      type: formData.type,
      description: formData.description,
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: formData.date
    };

    // Call parent handler
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

  // Dynamic categories based on type
  const categories = formData.type === 'income' 
    ? ['Salary', 'Freelance', 'Business', 'Investment', 'Other']
    : ['Food', 'Transportation', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Other'];

  return (
    <form className="add-transaction-form" onSubmit={handleSubmit}>
      <h2>Add Transaction</h2>
      
      {/* Type Selection */}
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

      {/* Description */}
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

      {/* Amount */}
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

      {/* Category */}
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

      {/* Date */}
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

      {/* Submit Button */}
      <button type="submit" className="btn">
        Add Transaction
      </button>
    </form>
  );
}

export default AddTransactionForm;
```

**Features:**
- ✅ Controlled form inputs
- ✅ Form validation
- ✅ Dynamic category dropdown
- ✅ Date picker with default today's date
- ✅ Radio buttons for type selection
- ✅ Auto-redirect after submission

---

### 3️⃣ **REACT ROUTER PAGES**

#### Page 1: Dashboard

**Route**: `/`  
**Location**: `src/pages/Dashboard.js`  
**Description**: Main page showing balance summary and transaction list

**Code:**
```javascript
import React from 'react';
import TransactionList from '../components/TransactionList';

function Dashboard({ transactions, onDelete }) {
  // Calculate total income
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  // Calculate total expenses
  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  // Calculate balance
  const balance = totalIncome - totalExpense;

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      
      {/* Balance Summary Cards */}
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

      {/* Transaction List */}
      <TransactionList transactions={transactions} onDelete={onDelete} />
    </div>
  );
}

export default Dashboard;
```

**Features:**
- ✅ Balance summary cards
- ✅ Real-time calculations
- ✅ Transaction list display
- ✅ Delete functionality

---

#### Page 2: Add Transaction

**Route**: `/add`  
**Location**: `src/pages/AddTransaction.js`  
**Description**: Dedicated page with form to add transactions

**Code:**
```javascript
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
```

**Features:**
- ✅ Clean form interface
- ✅ Form validation
- ✅ Success feedback
- ✅ Auto-redirect to dashboard

---

#### Page 3: Reports

**Route**: `/reports`  
**Location**: `src/pages/Reports.js`  
**Description**: Financial analysis page with category breakdowns

**Code:**
```javascript
import React from 'react';

function Reports({ transactions }) {
  // Calculate totals
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  // Group income by category
  const incomeByCategory = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  // Group expenses by category
  const expenseByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  return (
    <div className="reports">
      <h2>Financial Reports</h2>

      {/* Summary Section */}
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

      {/* Income by Category */}
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

      {/* Expenses by Category */}
      <div className="report-section">
        <h3>Expenses by Category</h3>
        {Object.keys(expenseByCategory).length > 0 ? (
          Object.entries(expenseByCategory)
            .sort((a, b) => b[1] - a[1]) // Sort by amount descending
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

      {/* Transaction Statistics */}
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
```

**Features:**
- ✅ Summary statistics
- ✅ Income breakdown by category
- ✅ Expense breakdown by category
- ✅ Sorted by amount
- ✅ Transaction counts

---

### 4️⃣ **FORMS IMPLEMENTATION**

#### Form Requirements:
- ✅ Add income transactions
- ✅ Add expense transactions
- ✅ Form validation
- ✅ Controlled components

#### Form Fields:

1. **Type Selection** (Radio Buttons)
   - Income
   - Expense

2. **Description** (Text Input)
   - Required field
   - User-friendly placeholder

3. **Amount** (Number Input)
   - Required field
   - Decimal support (step="0.01")
   - Minimum value: 0

4. **Category** (Dropdown)
   - Dynamic options based on type
   - Income categories: Salary, Freelance, Business, Investment, Other
   - Expense categories: Food, Transportation, Shopping, Bills, Entertainment, Health, Other

5. **Date** (Date Picker)
   - Defaults to today's date
   - Required field

#### Form Validation:
```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  
  // Check all required fields
  if (!formData.description || !formData.amount || !formData.category) {
    alert('Please fill in all fields');
    return;
  }
  
  // Amount must be positive
  if (parseFloat(formData.amount) <= 0) {
    alert('Amount must be greater than 0');
    return;
  }
  
  // Process form...
};
```

---

### 5️⃣ **ANIMATIONS**

#### Animation 1: Slide-In (Adding Items)

**Purpose**: Smooth appearance when transactions are added

**CSS:**
```css
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.transaction-item {
  animation: slideIn 0.5s ease;
}
```

**Description:**
- Duration: 0.5 seconds
- Effect: Fade in + slide up from 20px below
- Timing: ease function for smooth motion

---

#### Animation 2: Fade-Out (Removing Items)

**Purpose**: Smooth disappearance when transactions are deleted

**CSS:**
```css
@keyframes fadeOut {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.8);
  }
}

.fade-out {
  animation: fadeOut 0.3s ease forwards;
}
```

**JavaScript Implementation:**
```javascript
const handleDelete = () => {
  const element = document.getElementById(`transaction-${transaction.id}`);
  if (element) {
    element.classList.add('fade-out');
    setTimeout(() => {
      onDelete(transaction.id);
    }, 300); // Wait for animation
  }
};
```

**Description:**
- Duration: 0.3 seconds
- Effect: Fade out + scale down to 0.8
- Timing: ease forwards (maintains final state)

---

#### Animation 3: Hover Effects

**Purpose**: Interactive feedback on buttons and items

**CSS:**
```css
.btn:hover {
  background: #5568d3;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.transaction-item:hover {
  transform: translateX(5px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}
```

**Description:**
- Buttons lift up on hover
- Transaction items slide right
- Smooth transitions (0.3s)

---

## 📊 PROJECT STRUCTURE

```
IP/
└── ip/
    ├── public/
    │   ├── index.html
    │   └── favicon.ico
    ├── src/
    │   ├── components/
    │   │   ├── TransactionList.js       ✅ Reusable Component
    │   │   ├── TransactionItem.js        ✅ Reusable Component
    │   │   └── AddTransactionForm.js     ✅ Reusable Component (with Form)
    │   ├── pages/
    │   │   ├── Dashboard.js              ✅ React Router Page
    │   │   ├── AddTransaction.js         ✅ React Router Page
    │   │   └── Reports.js                ✅ React Router Page
    │   ├── App.js                        ✅ State Management & Router
    │   ├── App.css                       ✅ Animations & Styles
    │   └── index.js
    └── package.json
```

---

## ✅ REQUIREMENTS CHECKLIST

### State & Props
- ✅ `useState` for managing transactions array
- ✅ `useEffect` for localStorage persistence
- ✅ Props passed from parent to children
- ✅ Event handlers as props

### Reusable Components
- ✅ TransactionList component
- ✅ TransactionItem component
- ✅ AddTransactionForm component
- ✅ Props properly defined and used

### React Router
- ✅ Dashboard page at `/`
- ✅ Add Transaction page at `/add`
- ✅ Reports page at `/reports`
- ✅ Navigation between pages
- ✅ NavLink with active styling

### Forms
- ✅ Form to add income
- ✅ Form to add expenses
- ✅ Form validation
- ✅ Controlled components
- ✅ 5 input fields (type, description, amount, category, date)

### Animations
- ✅ Slide-in animation when adding items
- ✅ Fade-out animation when removing items
- ✅ Hover effects
- ✅ Smooth transitions

---

## 🎯 KEY FEATURES IMPLEMENTATION

### 1. State Management
- Global state in `App.js`
- LocalStorage persistence
- Immutable state updates
- Proper lifting of state

### 2. Component Reusability
- Each component handles one responsibility
- Props for data and callbacks
- Reusable across different pages
- Self-contained logic

### 3. Routing
- BrowserRouter setup
- Route configuration
- NavLink for navigation
- Programmatic navigation with useNavigate

### 4. Form Handling
- Controlled inputs
- Form validation
- Error messages
- Success feedback
- Form reset after submission

### 5. Animations
- CSS keyframe animations
- JavaScript timing for delete
- Smooth transitions
- User feedback through motion

---

## 📝 SUMMARY

This project successfully implements all required features:

1. ✅ **State & Props**: React hooks with proper data flow
2. ✅ **Reusable Components**: 3 components (TransactionList, TransactionItem, AddTransactionForm)
3. ✅ **Forms**: Complete form with validation for adding income/expenses
4. ✅ **React Router**: 3 pages (Dashboard, Add Transaction, Reports)
5. ✅ **Animations**: Slide-in, fade-out, and hover effects

**Repository**: https://github.com/stashlop/IP  
**Live Demo**: http://localhost:3000

---

**END OF REQUIREMENTS DOCUMENTATION**
