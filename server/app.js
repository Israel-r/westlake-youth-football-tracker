const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const playersRoutes = require('./routes/players');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.use('/players', playersRoutes);

app.get('/', (req, res) => res.send('Welcome to the Westlake Youth Football Tracker API!'));

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
