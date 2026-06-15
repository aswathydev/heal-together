const UserProfile = require('../models/UserProfile');
const ProviderProfile = require('../models/ProviderProfile');

exports.getAllPublicProviders = async (req, res) => {
  try {
    // Users can only view providers who have been explicitly verified by an Admin
    const activeProviders = await ProviderProfile.find({ isVerified: true }).populate('user', 'name email');
    res.status(200).json(activeProviders);
  } catch (error) {
    res.status(500).json({ message: 'Could not fetch medical providers', error: error.message });
  }
};

exports.addMoodRecord = async (req, res) => {
  try {
    const { mood, notes } = req.body;
    
    // Find or create profile configuration on the fly
    let profile = await UserProfile.findOne({ user: req.user.id });
    if (!profile) {
      profile = new UserProfile({ user: req.user.id, moodHistory: [] });
    }

    profile.moodHistory.unshift({ mood, notes });
    await profile.save();

    res.status(201).json({ message: 'Mood recorded successfully', currentHistory: profile.moodHistory });
  } catch (error) {
    res.status(500).json({ message: 'Failed to append logging entry', error: error.message });
  }
};

exports.getMoodHistory = async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ user: req.user.id });
    res.status(200).json(profile ? profile.moodHistory : []);
  } catch (error) {
    res.status(500).json({ message: 'Error querying profile details', error: error.message });
  }
};