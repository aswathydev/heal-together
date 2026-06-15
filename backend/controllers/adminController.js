const User = require('../models/User');
const ProviderProfile = require('../models/ProviderProfile');

exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalProviders = await User.countDocuments({ role: 'provider' });
    const pendingApproval = await ProviderProfile.countDocuments({ isVerified: false });
    
    res.status(200).json({ totalUsers, totalProviders, pendingApproval });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving metrics', error: error.message });
  }
};

exports.verifyProvider = async (req, res) => {
  try {
    const updated = await ProviderProfile.findByIdAndUpdate(
      req.params.profileId, 
      { isVerified: true }, 
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Profile not found' });
    res.status(200).json({ message: 'Provider successfully approved!', updated });
  } catch (error) {
    res.status(500).json({ message: 'Verification operation failed', error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to extract system users', error: error.message });
  }
};