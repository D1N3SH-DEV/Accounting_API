// src/BalanceSheet.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './chartConfig'; // Import the Chart.js configuration

const BalanceSheet = () => {
    const [transactions, setTransactions] = useState([]);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [openingBalance, setOpeningBalance] = useState(0);
    const [closingBalance, setClosingBalance] = useState(0);
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8134/transactions?date=${date}`);
                setTransactions(response.data);
                calculateBalances(response.data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
                alert('Failed to fetch transactions. Please try again later.');
            }
        };

        fetchTransactions();
    }, [date]);

    const calculateBalances = (transactions) => {
        let total = 0;
        transactions.forEach(transaction => {
            total += parseFloat(transaction.amount);
        });
        setOpeningBalance(0); // Fetch this from your backend if needed
        setClosingBalance(total);
    };

    const handleConfirmClosingBalance = () => {
        setShowConfirm(true);
    };

    const handleConfirm = () => {
        alert('Closing balance confirmed.');
        setShowConfirm(false);
    };

    const handleCancel = () => {
        setShowConfirm(false);
    };

    const styles = {
        container: {
            maxWidth: '900px',
            margin: '0 auto',
            padding: '30px',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
            fontFamily: 'Arial, sans-serif'
        },
        title: {
            textAlign: 'center',
            color: '#333',
            marginBottom: '20px',
            fontSize: '24px'
        },
        label: {
            fontWeight: '600',
            marginBottom: '8px',
            color: '#555'
        },
        input: {
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
            fontSize: '16px'
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            marginBottom: '20px'
        },
        th: {
            borderBottom: '2px solid #ddd',
            padding: '10px'
        },
        td: {
            padding: '10px'
        },
        button: {
            padding: '15px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            transition: 'background-color 0.3s ease',
        },
        buttonHover: {
            backgroundColor: '#0056b3'
        },
        confirmBox: {
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#f8d7da',
            borderRadius: '8px',
            color: '#721c24',
            border: '1px solid #f5c6cb'
        },
        confirmButton: {
            padding: '10px',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            marginRight: '10px',
            transition: 'background-color 0.3s ease',
        },
        cancelButton: {
            padding: '10px',
            backgroundColor: '#dc3545',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'background-color 0.3s ease',
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Balance Sheet</h2>

            <div style={{ marginBottom: '20px' }}>
                <label style={styles.label}>Select Date:</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    style={styles.input}
                />
            </div>

            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>Date</th>
                        <th style={styles.th}>Category</th>
                        <th style={styles.th}>Description</th>
                        <th style={styles.th}>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => (
                        <tr key={index}>
                            <td style={styles.td}>{transaction.date}</td>
                            <td style={styles.td}>{transaction.category}</td>
                            <td style={styles.td}>{transaction.description}</td>
                            <td style={styles.td}>{transaction.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '20px'
            }}>
                <div>
                    <strong>Opening Balance:</strong> ₹{openingBalance.toFixed(2)}
                </div>
                <div>
                    <strong>Closing Balance:</strong> ₹{closingBalance.toFixed(2)}
                </div>
            </div>

            <button
                onClick={handleConfirmClosingBalance}
                style={styles.button}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
            >
                Confirm Closing Balance
            </button>

            {showConfirm && (
                <div style={styles.confirmBox}>
                    <p>Are you sure you want to confirm the closing balance for today?</p>
                    <button
                        onClick={handleConfirm}
                        style={styles.confirmButton}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#218838'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#28a745'}
                    >
                        Confirm
                    </button>
                    <button
                        onClick={handleCancel}
                        style={styles.cancelButton}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c82333'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#dc3545'}
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
};

export default BalanceSheet;
