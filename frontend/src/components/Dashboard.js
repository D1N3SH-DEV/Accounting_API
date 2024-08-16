import React, { useState, useEffect } from 'react';
import { Chart } from 'react-chartjs-2';

function Dashboard({ transactions = [] }) {
    const [data, setData] = useState({});

    useEffect(() => {
        if (transactions.length === 0) {
            // Handle empty transactions array
            setData({
                labels: [],
                datasets: []
            });
            return;
        }

        // Process data for the chart
        const categories = [...new Set(transactions.map(t => t.category))];
        const amounts = categories.map(cat => 
            transactions
                .filter(t => t.category === cat)
                .reduce((sum, t) => sum + t.amount, 0)
        );

        setData({
            labels: categories,
            datasets: [
                {
                    label: 'Transaction Amounts by Category',
                    data: amounts,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }
            ]
        });
    }, [transactions]);

    return (
        <div>
            <h2>Dashboard</h2>
            {transactions.length > 0 ? (
                <Chart type="bar" data={data} />
            ) : (
                <p>No transactions found</p>
            )}
        </div>
    );
}

export default Dashboard;
