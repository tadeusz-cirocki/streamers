const mongoose = require('mongoose');
const config = require('./config');

/**
 * Connects to the MongoDB database.
 * @return {Promise<void>}
 * A Promise that resolves when the connection is established.
 */
async function connectDB() {
  try {
    await mongoose.connect(config.mongoURI, {
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
