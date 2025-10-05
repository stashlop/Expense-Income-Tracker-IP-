# Expense and Income Tracker

A React application for tracking personal expenses and income with a clean, animated interface.

## Features

- **Dashboard**: View balance summary and recent transactions
- **Add Transaction**: Form to add new income or expense transactions
- **Reports**: Detailed financial reports with category breakdowns
- **Animations**: Smooth animations when adding/removing transactions
- **Local Storage**: Data persists in browser's local storage
- **React Router**: Navigation between different pages
- **Responsive Design**: Works on desktop and mobile devices

## Components

### Reusable Components
- **TransactionList**: Displays a list of all transactions
- **TransactionItem**: Individual transaction card with delete functionality
- **AddTransactionForm**: Form component for adding new transactions

### Pages
- **Dashboard**: Main view showing balance summary and transaction list
- **Add Transaction**: Dedicated page for adding new transactions
- **Reports**: Financial reports and category breakdowns

## State Management

The app uses React's `useState` and `useEffect` hooks to manage:
- Transaction data (stored in localStorage)
- Form inputs
- Component interactions

Props are used to pass data and handlers between components:
- `transactions` array passed to child components
- `onAddTransaction` handler for adding new transactions
- `onDelete` handler for removing transactions

## Installation

1. Navigate to the project directory:
```bash
cd /workspaces/IP/ip
```

2. Install dependencies (already done):
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## Usage

1. **View Dashboard**: See your current balance, total income, and expenses
2. **Add Transactions**: Click "Add Transaction" to add new income or expenses
3. **View Reports**: Check detailed breakdowns by category
4. **Delete Transactions**: Click the "Delete" button on any transaction to remove it

## Technologies Used

- React 18
- React Router v6
- CSS3 with animations
- LocalStorage for data persistence

## Project Structure

```
src/
├── components/
│   ├── TransactionList.js      # List of transactions
│   ├── TransactionItem.js       # Individual transaction
│   └── AddTransactionForm.js    # Form to add transactions
├── pages/
│   ├── Dashboard.js             # Dashboard page
│   ├── AddTransaction.js        # Add transaction page
│   └── Reports.js               # Reports page
├── App.js                        # Main app component with routing
├── App.css                       # All styles and animations
└── index.js                      # Entry point
```

## Features Details

### Animations
- Slide-in animation when transactions are added
- Fade-out animation when transactions are deleted
- Smooth transitions on hover effects

### Categories
- **Income**: Salary, Freelance, Business, Investment, Other
- **Expenses**: Food, Transportation, Shopping, Bills, Entertainment, Health, Other

## Future Enhancements

- Add date range filtering
- Export data to CSV
- Charts and graphs for better visualization
- Multiple accounts support
- Budget goals and alerts
