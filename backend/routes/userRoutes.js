const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const { addMoodRecord, getMoodHistory, getAllPublicProviders } = require('../controllers/userController');

// Anyone can see available therapists/providers
router.get('/public-providers', getAllPublicProviders);

// Mood tracking data requires standard authorization
router.use(protect);
router.use(authorizeRoles('user'));

router.post('/mood', addMoodRecord);
router.get('/mood-history', getMoodHistory);

module.exports = router;