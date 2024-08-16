import React, { useState } from 'react';

const TransactionForm = () => {
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('Rent');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Cash');
    const [vendor, setVendor] = useState('');
    const [invoiceNumber, setInvoiceNumber] = useState('');
    const [receiptStatus, setReceiptStatus] = useState('Pending');
    const [remarks, setRemarks] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate amount
        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            alert('Please enter a valid amount');
            return;
        }

        const newTransaction = {
            date,
            category,
            description,
            amount: parsedAmount,
            paymentMethod,
            vendor_supplier: vendor, // Match field name with backend
            invoice_number: invoiceNumber, // Match field name with backend
            receipt_document: receiptStatus, // Match field name with backend
            remarks,
        };

        try {
            const response = await fetch('http://localhost:5162/transactions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTransaction),
            });

            if (response.ok) {
                const result = await response.json();
                alert('Transaction added successfully');
                console.log('New Transaction:', result);
                // Reset form after submission
                setDate('');
                setCategory('Rent');
                setDescription('');
                setAmount('');
                setPaymentMethod('Cash');
                setVendor('');
                setInvoiceNumber('');
                setReceiptStatus('Pending');
                setRemarks('');
            } else {
                alert('Failed to add transaction');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while adding the transaction');
        }
    };

    return (
        <div style={{
            maxWidth: '700px',
            margin: '0 auto',
            padding: '30px',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
            fontFamily: 'Arial, sans-serif'
        }}>
            <h2 style={{
                textAlign: 'center',
                color: '#333',
                marginBottom: '20px',
                fontSize: '24px'
            }}>Add Transaction</h2>
            <form onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
            }}>
                {/* Date Field */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor="date" style={{
                        fontWeight: '600',
                        marginBottom: '8px',
                        color: '#555'
                    }}>Date:</label>
                    <input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        style={{
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid #ddd',
                            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
                            fontSize: '16px'
                        }}
                    />
                </div>

                {/* Category Field */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor="category" style={{
                        fontWeight: '600',
                        marginBottom: '8px',
                        color: '#555'
                    }}>Category:</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        style={{
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid #ddd',
                            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
                            fontSize: '16px'
                        }}
                    >
                        <option value="Rent">Rent</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Supplies">Supplies</option>
                        <option value="Vegetables">Vegetables</option>
                        <option value="Dairy Products">Dairy Products</option>
                        <option value="Grocery">Grocery</option>
                        <option value="Gas">Gas</option>
                        <option value="Coal">Coal</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Stationery">Stationery</option>
                        <option value="Advance Payment to staff or vendors">Advance Payment to staff or vendors</option>
                        <option value="Ice-Cream Suppliers">Ice-Cream Suppliers</option>
                    </select>
                </div>

                {/* Description Field */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor="description" style={{
                        fontWeight: '600',
                        marginBottom: '8px',
                        color: '#555'
                    }}>Description:</label>
                    <input
                        id="description"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        style={{
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid #ddd',
                            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
                            fontSize: '16px'
                        }}
                    />
                </div>

                {/* Amount Field */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor="amount" style={{
                        fontWeight: '600',
                        marginBottom: '8px',
                        color: '#555'
                    }}>Amount:</label>
                    <input
                        id="amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        style={{
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid #ddd',
                            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
                            fontSize: '16px'
                        }}
                    />
                </div>

                {/* Payment Method Field */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor="paymentMethod" style={{
                        fontWeight: '600',
                        marginBottom: '8px',
                        color: '#555'
                    }}>Payment Method:</label>
                    <select
                        id="paymentMethod"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        required
                        style={{
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid #ddd',
                            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
                            fontSize: '16px'
                        }}
                    >
                        <option value="Cash">Cash</option>
                        <option value="Card">Card</option>
                        <option value="UPI">UPI</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                    </select>
                </div>

                {/* Vendor Field */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor="vendor" style={{
                        fontWeight: '600',
                        marginBottom: '8px',
                        color: '#555'
                    }}>Vendor/Supplier:</label>
                    <input
                        id="vendor"
                        type="text"
                        value={vendor}
                        onChange={(e) => setVendor(e.target.value)}
                        required
                        style={{
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid #ddd',
                            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
                            fontSize: '16px'
                        }}
                    />
                </div>

                {/* Invoice Number Field */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor="invoiceNumber" style={{
                        fontWeight: '600',
                        marginBottom: '8px',
                        color: '#555'
                    }}>Invoice Number:</label>
                    <input
                        id="invoiceNumber"
                        type="text"
                        value={invoiceNumber}
                        onChange={(e) => setInvoiceNumber(e.target.value)}
                        style={{
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid #ddd',
                            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
                            fontSize: '16px'
                        }}
                    />
                </div>

                {/* Receipt Status Field */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor="receiptStatus" style={{
                        fontWeight: '600',
                        marginBottom: '8px',
                        color: '#555'
                    }}>Receipt/Document Status:</label>
                    <select
                        id="receiptStatus"
                        value={receiptStatus}
                        onChange={(e) => setReceiptStatus(e.target.value)}
                        required
                        style={{
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid #ddd',
                            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
                            fontSize: '16px'
                        }}
                    >
                        <option value="Attached">Attached</option>
                        <option value="Pending">Pending</option>
                    </select>
                </div>

                {/* Remarks Field */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor="remarks" style={{
                        fontWeight: '600',
                        marginBottom: '8px',
                        color: '#555'
                    }}>Remarks:</label>
                    <textarea
                        id="remarks"
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        style={{
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid #ddd',
                            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
                            fontSize: '16px',
                            minHeight: '100px'
                        }}
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" style={{
                    padding: '12px 20px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    fontSize: '16px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                    marginTop: '20px'
                }}>
                    Add Transaction
                </button>
            </form>
        </div>
    );
};

export default TransactionForm;
