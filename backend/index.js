const config = require('./config');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

const port = 3000;

app.get('/', (req, res) => {
  res.send('Server is running!');
});

mongoose
    .connect(config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Connected to the database');
    })
    .catch((error) => {
      console.error('Error connecting to the database:', error);
    });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
