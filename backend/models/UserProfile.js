const mongoose = require('mongoose');

const UserProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  dateOfBirth: Date,
  gender: String,
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String
  },
  moodHistory: [{
    mood: { type: String, enum: ['happy', 'neutral', 'sad', 'angry', 'tired'] },
    notes: String,
    createdAt: { type: Date, default: Date.now }
  }],
  journalEntries: [{ title: String, content: String, createdAt: { type: Date, default: Date.now } }]
});

module.exports = mongoose.model('UserProfile', UserProfileSchema);