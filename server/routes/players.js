// server/routes/players.js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const players = await db.query('SELECT * FROM players');
    res.json(players);
  } catch (error) {
    console.error('Error fetching players:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  const { name } = req.body;
  try {
    const result = await db.query('INSERT INTO players (name) VALUES (?)', [name]);
    res.json({ id: result.insertId, name }); 
  } catch (error) {
    console.error('Error adding player:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ... other routes for updating/deleting players

module.exports = router;
