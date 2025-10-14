const express = require('express');
const app = express();

const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, 'cloneK.db');
const db = new Database(dbPath);

console.log('Using database file:', dbPath);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/question', (req, res) => {
    try {
        const rows = db.prepare('SELECT * FROM questions').all();
        res.json(rows);
    } catch (err) {
        console.error('Database error:', err.message);
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => {
    console.log('Server is on port 3000');
});