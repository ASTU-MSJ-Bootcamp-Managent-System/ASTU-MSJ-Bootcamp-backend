const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/user.model');
const connectDB = require('../config/database');

const seedAdmin = async () => {
  try {
    await connectDB();

    const adminExists = await User.findOne({ role: 'ADMIN' });

    if (adminExists) {
      console.log('Admin user already exists. Skipping seed.');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash('Admin@123456', 10);

    const adminUser = await User.create({
      name: 'System Administrator',
      email: 'admin@astu.edu.et',
      password: hashedPassword,
      role: 'ADMIN',
      isActive: true,
    });

    console.log('Initial Admin user created successfully:');
    console.log(`Email: ${adminUser.email}`);
    console.log(`ID: ${adminUser._id}`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin user:', error.message);
    process.exit(1);
  }
};

seedAdmin();