import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TransactionForm from './components/TransactionForm';
import Dashboard from './components/Dashboard';
import BalanceSheet from './components/BalanceSheet';
import { TransactionProvider } from './components/TransactionContext';

const App = () => {
    return (
        <TransactionProvider>
            <Router>
                <div>
                    <nav style={{ padding: '20px', backgroundColor: '#f8f9fa', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                        <Link to="/" style={{ margin: '0 15px', textDecoration: 'none', color: '#007BFF', fontSize: '18px' }}>Transaction Form</Link>
                        <Link to="/dashboard" style={{ margin: '0 15px', textDecoration: 'none', color: '#007BFF', fontSize: '18px' }}>Dashboard</Link>
                        <Link to="/balance-sheet" style={{ margin: '0 15px', textDecoration: 'none', color: '#007BFF', fontSize: '18px' }}>Balance Sheet</Link>
                    </nav>

                    <Routes>
                        <Route path="/" element={<TransactionForm />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/balance-sheet" element={<BalanceSheet />} />
                    </Routes>
                </div>
            </Router>
        </TransactionProvider>
    );
};

export default App;
