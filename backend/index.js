const express = require('express');
const {connectDB} = require('./db');

const app = express();

app.use(express.json());

const port = 3000;

app.get('/', (req, res) => {
  res.send('Server is running!');
});

connectDB();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
