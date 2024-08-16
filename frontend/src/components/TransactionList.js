import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import EditTransactionForm from './EditTransactionForm';
import Dashboard from './Dashboard'; // Ensure this file exists and is correctly implemented

function TransactionList() {
    const [transactions, setTransactions] = useState([]);
    const [editTransaction, setEditTransaction] = useState(null);
    const [loading, setLoading] = useState(true);
    const [ws, setWs] = useState(null);

    useEffect(() => {
        // Fetch initial transactions
        const fetchTransactions = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8134/transactions');
                if (!response.ok) throw new Error('Failed to fetch transactions');
                const data = await response.json();
                setTransactions(data);
            } catch (error) {
                toast.error('Error fetching transactions');
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();

        // WebSocket connection
        const socket = new WebSocket('ws://127.0.0.1:5000');
        setWs(socket);

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setTransactions(data);
        };

        return () => {
            socket.close();
        };
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/transactions/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                toast.success('Transaction deleted successfully');
            } else {
                toast.error('Failed to delete transaction');
            }
        } catch (error) {
            toast.error('Error deleting transaction');
        }
    };

    return (
        <div>
            <h2>Transaction List</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {transactions.map((transaction) => (
                        <li key={transaction.id}>
                            {transaction.date} - {transaction.category} - {transaction.description} - {transaction.amount} - {transaction.payment_method} - {transaction.vendor} - {transaction.invoice_number} - {transaction.receipt_status} - {transaction.remarks}
                            <button onClick={() => setEditTransaction(transaction)}>Edit</button>
                            <button onClick={() => handleDelete(transaction.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
            {editTransaction && (
                <EditTransactionForm
                    transaction={editTransaction}
                    setTransactions={setTransactions}
                    transactions={transactions}
                    setEditTransaction={setEditTransaction}
                />
            )}
            <Dashboard transactions={transactions} />
        </div>
    );
}

export default TransactionList;
