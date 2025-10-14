const express = require('express');
const app = express();

const Database = require('better-sqlite3');
const db = new Database('cloneK.db');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/member', (req, res) =>{
    const row =db.prepare('SELECT * FROM member').all();
    res.json(row);
});

app.listen(3000, ()=> {
    console.log('Server is on port 3000');
});