const ProviderProfile = require('../models/ProviderProfile');

exports.getDashboardData = async (req, res) => {
  try {
    // req.user.id is injected into req by your 'protect' middleware
    const profile = await ProviderProfile.findOne({ user: req.user.id }).populate('user', 'name email');
    if (!profile) return res.status(404).json({ message: 'Profile details missing' });
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile insights', error: error.message });
  }
};

exports.updateAvailability = async (req, res) => {
  try {
    const { availability } = req.body; // Expects array matching your validation matrix
    const updatedProfile = await ProviderProfile.findOneAndUpdate(
      { user: req.user.id },
      { availability },
      { new: true }
    );
    res.status(200).json({ message: 'Availability schedule updated', updatedProfile });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update schedule details', error: error.message });
  }
};