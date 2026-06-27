const express = require('express');
const router = express.Router();
// const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const { getAllProviders } = require('../controllers/providerController');

// All endpoints here require a 'provider' token status
// router.use(protect);
// router.use(authorizeRoles('provider'));

router.get("/", getAllProviders);
// router.get('/dashboard', getDashboardData);
// router.put('/availability', updateAvailability);

module.exports = router;