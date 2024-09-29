const express = require('express');
const router = express.Router();

// Example route to fetch all players
router.get('/', (req, res) => {
    res.json([{ id: 1, name: 'John Doe' }]);
});

module.exports = router;
