const mongoose = require('mongoose');

/* Loading the environment variables from the .env file. */
require('dotenv').config();

/**
 * Connects to the MongoDB database.
 * @return {Promise<void>}
 * A Promise that resolves when the connection is established.
 */
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1); // Exit the process with a failure code
  }
}

module.exports = {connectDB};
