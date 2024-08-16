// server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const db = new sqlite3.Database('./transactions.db');

// Middleware
app.use(express.json());
app.use(cors());

// Initialize database
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS transactions (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, category TEXT, description TEXT, amount REAL, payment_method TEXT, vendor TEXT, invoice_number TEXT, receipt_status TEXT, remarks TEXT)");
});

// WebSocket connection handler
wss.on('connection', ws => {
    console.log('New WebSocket connection');

    // Send initial transactions data
    db.all("SELECT * FROM transactions", [], (err, rows) => {
        if (err) {
            throw err;
        }
        ws.send(JSON.stringify(rows));
    });

    ws.on('message', message => {
        const data = JSON.parse(message);
        if (data.type === 'UPDATE_TRANSACTIONS') {
            // Save new transactions to the database
            data.transactions.forEach(transaction => {
                const { id, ...transactionData } = transaction;
                db.run("REPLACE INTO transactions (id, date, category, description, amount, payment_method, vendor, invoice_number, receipt_status, remarks) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [id, transactionData.date, transactionData.category, transactionData.description, transactionData.amount, transactionData.payment_method, transactionData.vendor, transactionData.invoice_number, transactionData.receipt_status, transactionData.remarks]);
            });
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    db.all("SELECT * FROM transactions", [], (err, rows) => {
                        if (err) {
                            throw err;
                        }
                        client.send(JSON.stringify(rows));
                    });
                }
            });
        }
    });
});

// API endpoints
app.get('/transactions', (req, res) => {
    db.all("SELECT * FROM transactions", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

app.post('/transactions', (req, res) => {
    const { date, category, description, amount, payment_method, vendor, invoice_number, receipt_status, remarks } = req.body;
    db.run("INSERT INTO transactions (date, category, description, amount, payment_method, vendor, invoice_number, receipt_status, remarks) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [date, category, description, amount, payment_method, vendor, invoice_number, receipt_status, remarks], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            const newTransaction = { id: this.lastID, date, category, description, amount, payment_method, vendor, invoice_number, receipt_status, remarks };
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify([newTransaction]));
                }
            });
            res.status(201).json(newTransaction);
        }
    });
});

app.put('/transactions/:id', (req, res) => {
    const { id } = req.params;
    const { date, category, description, amount, payment_method, vendor, invoice_number, receipt_status, remarks } = req.body;
    db.run("UPDATE transactions SET date = ?, category = ?, description = ?, amount = ?, payment_method = ?, vendor = ?, invoice_number = ?, receipt_status = ?, remarks = ? WHERE id = ?", [date, category, description, amount, payment_method, vendor, invoice_number, receipt_status, remarks, id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            const updatedTransaction = { id, date, category, description, amount, payment_method, vendor, invoice_number, receipt_status, remarks };
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify([updatedTransaction]));
                }
            });
            res.json(updatedTransaction);
        }
    });
});

app.delete('/transactions/:id', (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM transactions WHERE id = ?", [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    db.all("SELECT * FROM transactions", [], (err, rows) => {
                        if (err) {
                            throw err;
                        }
                        client.send(JSON.stringify(rows));
                    });
                }
            });
            res.status(204).end();
        }
    });
});

server.listen(5000, () => {
    console.log('Server is running on port 5000');
});
