import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddTransaction from './pages/AddTransaction';
import Reports from './pages/Reports';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const handleAddTransaction = (transaction) => {
    setTransactions(prev => [transaction, ...prev]);
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  return (
    <Router>
      <div className="app">
        <nav>
          <ul>
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/add" 
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                Add Transaction
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/reports" 
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                Reports
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="container">
          <Routes>
            <Route 
              path="/" 
              element={
                <Dashboard 
                  transactions={transactions} 
                  onDelete={handleDeleteTransaction} 
                />
              } 
            />
            <Route 
              path="/add" 
              element={
                <AddTransaction 
                  onAddTransaction={handleAddTransaction} 
                />
              } 
            />
            <Route 
              path="/reports" 
              element={
                <Reports 
                  transactions={transactions} 
                />
              } 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
