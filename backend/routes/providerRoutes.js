const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/auth');
const { updateAvailability, getDashboardData } = require('../controllers/providerController');

// All endpoints here require a 'provider' token status
router.use(protect);
router.use(authorizeRoles('provider'));

router.get('/dashboard', getDashboardData);
router.put('/availability', updateAvailability);

module.exports = router;