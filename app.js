const express = require('express');
const path = require('path');
const authRoutes = require('./routes/auth');
const Database = require('better-sqlite3');

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);

const dbPath = path.join(__dirname, 'cloneK.db');
const db = new Database(dbPath);
console.log('Using database file:', dbPath);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
