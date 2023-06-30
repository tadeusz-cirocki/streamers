const express = require('express');
const cors = require('cors');
const streamerRoutes = require('./routes/streamers');
const {connectDB} = require('./db');

// Create the Express app
const app = express();

/* Loading the environment variables from the .env file. */
require('dotenv').config();

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS

// Connect to MongoDB
connectDB();

// Routes
app.use('/streamers', streamerRoutes);

// Start the server
const port = process.env.PORT || 80;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = app;
