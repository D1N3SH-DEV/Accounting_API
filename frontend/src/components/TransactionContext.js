// src/components/TransactionContext.js
import React, { createContext, useState, useContext } from 'react';

// Create a Context for the transactions
const TransactionContext = createContext();

// Create a Provider component
export const TransactionProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([]);

    // Function to add a transaction with async operation example
    const addTransaction = async (transaction) => {
        // Basic validation example
        if (!transaction.date || !transaction.category || isNaN(transaction.amount) || transaction.amount <= 0) {
            console.error('Invalid transaction data:', transaction);
            return;
        }

        try {
            // Example of an async operation, e.g., sending data to a backend
            const response = await fetch('/api/transactions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(transaction),
            });

            if (!response.ok) {
                throw new Error('Failed to add transaction');
            }

            // Add transaction to state if the response is successful
            setTransactions(prevTransactions => [...prevTransactions, transaction]);
        } catch (error) {
            console.error('Error adding transaction:', error);
            // Handle error, e.g., display a notification to the user
        }
    };

    return (
        <TransactionContext.Provider value={{ transactions, addTransaction }}>
            {children}
        </TransactionContext.Provider>
    );
};

// Custom hook to use the TransactionContext
export const useTransactions = () => useContext(TransactionContext);
