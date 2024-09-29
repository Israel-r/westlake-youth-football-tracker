const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const db = require('./db'); // Your database connection

app.use(express.json());

// Routes
const playerRoutes = require('./routes/players');
const lineupRoutes = require('./routes/lineups');

app.use('/api/players', playerRoutes);
app.use('/api/lineups', lineupRoutes);

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
