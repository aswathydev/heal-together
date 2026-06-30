const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/User'); // Adjust path to your model
require('dotenv').config();

const seedAdmin = async () => {
  try {
    // 1. Connect to your database
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Database connected...');

    // 2. Check if an admin already exists to prevent duplicates
    const adminExists = await Admin.findOne({ email: 'superadmin@app.com' });
    if (adminExists) {
      console.log('Admin already seeded.');
      process.exit();
    }

    // 3. Hash the initial master password safely
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('SecureMasterPassword2026!', salt);

    // 4. Insert the admin
    await Admin.create({
      name: 'Super Admin',
      email: 'superadmin@app.com',
      password: hashedPassword,
      role: 'admin'
    });

    console.log('🚀 Admin account created successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();