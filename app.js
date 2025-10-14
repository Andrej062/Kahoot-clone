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

app.get('/member', (req, res) => {
    const rows = db.prepare('SELECT * FROM member').all();
    res.json(rows);
});

app.listen(3000, () => {
    console.log('Server is on port 3000');
});