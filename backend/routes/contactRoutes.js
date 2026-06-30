const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Main contact endpoint
router.post('/', contactController.submitMessage);

// Optional: Admin view path (uncomment if you have admin middleware)
// const { protect, admin } = require('../middleware/authMiddleware');
// router.get('/', protect, admin, contactController.getAllMessages);

module.exports = router;