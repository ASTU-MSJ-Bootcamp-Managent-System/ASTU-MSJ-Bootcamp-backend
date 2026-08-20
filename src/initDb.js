const dotenv = require('dotenv');
const connectDB = require('./config/database');

// Import models using your project's naming convention (.model.js)
const User = require('./models/user.model');
const Batch = require('./models/batch.model');

dotenv.config();

const initializeCollections = async () => {
  try {
    await connectDB();

    console.log('Inserting initial test documents into Atlas...');

    const admin = await User.create({
      name: 'System Admin',
      email: 'admin@example.com',
      password: 'password123',
      role: 'ADMIN',
    });

    await Batch.create({
      name: 'Batch 01',
      description: 'First Batch',
      startDate: new Date(),
      endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      mentors: [admin._id],
    });

    console.log('Database and collections successfully created in Atlas!');
    process.exit(0);
  } catch (error) {
    console.error('Initialization error:', error.message);
    process.exit(1);
  }
};

initializeCollections();