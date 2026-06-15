const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/auth');
const { getDashboardStats, verifyProvider, getAllUsers } = require('../controllers/adminController');

// All endpoints in this file are restricted to Admins
router.use(protect);
router.use(authorizeRoles('admin'));

router.get('/stats', getDashboardStats);
router.get('/users', getAllUsers);
router.put('/providers/:profileId/verify', verifyProvider);

module.exports = router;