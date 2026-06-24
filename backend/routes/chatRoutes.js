const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const protect = require('../middleware/authMiddleware'); // Your auth middleware

// All chat routes require authentication
// router.use(protect);

/**
 * @route   POST /api/chat
 * @desc    Send a message to the AI chatbot, log history, and get a supportive response
 * @access  Private (Authenticated Users)
 */
router.post('/', protect,  chatController.handleChatMessage);

module.exports = router;