import React, { useState } from 'react';
import { toast } from 'react-toastify';

function EditTransactionForm({ transaction, setTransactions, transactions, setEditTransaction }) {
    const [formData, setFormData] = useState({ ...transaction });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://127.0.0.1:8134/transactions/${transaction.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                const updatedTransaction = await response.json();
                setTransactions(transactions.map(t => (t.id === transaction.id ? updatedTransaction : t)));
                setEditTransaction(null);
                toast.success('Transaction updated successfully');
            } else {
                toast.error('Failed to update transaction');
            }
        } catch (error) {
            toast.error('Error updating transaction');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Date:
                <input type="date" name="date" value={formData.date} onChange={handleChange} required />
            </label>
            <label>
                Category:
                <select name="category" value={formData.category} onChange={handleChange} required>
                    <option value="">Select</option>
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
            </label>
            <label>
                Description:
                <input type="text" name="description" value={formData.description} onChange={handleChange} required />
            </label>
            <label>
                Amount:
                <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />
            </label>
            <label>
                Payment Method:
                <select name="payment_method" value={formData.payment_method} onChange={handleChange} required>
                    <option value="">Select</option>
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                    <option value="UPI">UPI</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                </select>
            </label>
            <label>
                Vendor/Supplier:
                <input type="text" name="vendor" value={formData.vendor} onChange={handleChange} required />
            </label>
            <label>
                Invoice Number:
                <input type="text" name="invoice_number" value={formData.invoice_number} onChange={handleChange} />
            </label>
            <label>
                Receipt/Document:
                <input type="text" name="receipt_status" value={formData.receipt_status} onChange={handleChange} />
            </label>
            <label>
                Remarks:
                <input type="text" name="remarks" value={formData.remarks} onChange={handleChange} />
            </label>
            <button type="submit">Update Transaction</button>
            <button type="button" onClick={() => setEditTransaction(null)}>Cancel</button>
        </form>
    );
}

export default EditTransactionForm;
