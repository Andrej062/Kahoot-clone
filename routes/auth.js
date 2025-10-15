const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Database = require('better-sqlite3');
const path = require('path');

const router = express.Router();

const dbPath = path.join(__dirname, '..', 'cloneK.db');
const db = new Database(dbPath);

const JWT_SECRET = "mysecretkey";

// Registration
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: "Fill the fields" });

    const existing = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
    if (existing) return res.status(400).json({ message: "This user already exists" });

    const hashed = bcrypt.hashSync(password, 10);
    db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run(username, hashed);

    res.json({ message: "Successfully" });
});

// Log in
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: "Fill the fields" });

    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
    if (!user) return res.status(400).json({ message: "Fail login" });

    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) return res.status(400).json({ message: "Fail password" });

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: "Successfully", token });
});

module.exports = router;
