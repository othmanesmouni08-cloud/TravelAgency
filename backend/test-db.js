const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

async function testConnection() {
  try {
    console.log('Testing connection to:', process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('SUCCESS: Connected to MongoDB');
    process.exit(0);
  } catch (err) {
    console.error('FAILURE: Could not connect to MongoDB');
    console.error(err);
    process.exit(1);
  }
}

testConnection();
