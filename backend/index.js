const express = require('express');
const streamerRoutes = require('./routes/streamers');
const {connectDB} = require('./db');

// Create the Express app
const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/streamers', streamerRoutes);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
