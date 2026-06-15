const User = require('../models/User');
const UserProfile = require('../models/UserProfile');
const ProviderProfile = require('../models/ProviderProfile');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Helper to generate JWT structure
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// 🧘 POST: Register a Standard User
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 1. Create Base Auth Credentials
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'user'
    });

    // 2. Create Linked Blank User Profile Data Document
    await UserProfile.create({ user: newUser._id, moodHistory: [], journalEntries: [] });

    res.status(201).json({
      token: generateToken(newUser._id, newUser.role),
      user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role }
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failure', error: error.message });
  }
};

// 🩺 POST: Register a Healthcare Provider
exports.registerProvider = async (req, res) => {
  try {
    const { name, email, password, specialization, qualification, licenseNumber, experienceYears, bio, phone} = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'Email already registered' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const documentUrl = req.file ? req.file.path : null;
    
    // 1. Create Base Auth Credentials
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'provider'
    });

    // 2. Attempt Profile Creation
    try {
      const newProfile = await ProviderProfile.create({
        user: newUser._id,
        phone,
        specialization,
        qualification,
        licenseNumber,
        experienceYears,
        bio,
        documentUrl,
        // hourlyRate,
        // availability: []
        services
      });

      res.status(201).json({
        token: generateToken(newUser._id, newUser.role),
        user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role },
        profile: newProfile
      });
    } catch (profileError) {
      // Clean up orphaned account if profiling errors occur
      await User.findByIdAndDelete(newUser._id);
      return res.status(400).json({ message: 'Profile field validation failed.', error: profileError.message });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error processing setup', error: error.message });
  }
};

// 🔑 POST: Unified App Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    res.status(200).json({
      token: generateToken(user._id, user.role),
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server login issue', error: error.message });
  }
};

// 🔄 GET: Sync User Context on Browser Reload
exports.getMe = async (req, res) => {
  try {
    // req.user was previously fetched and verified inside the 'protect' middleware
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: 'Verification lookup fault', error: error.message });
  }
};