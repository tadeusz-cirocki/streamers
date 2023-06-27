const express = require('express');
const streamerRoutes = require('./routes/streamers');
const {connectDB} = require('./db');

// Create the Express app
const app = express();

/* Loading the environment variables from the .env file. */
require('dotenv').config();

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/streamers', streamerRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = app;
