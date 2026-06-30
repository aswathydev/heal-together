const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController'); // Adjust path to your controller file
const protect = require('../middleware/authMiddleware'); // Your authentication middleware

// @desc    Get clean community feed (Excludes flagged items)
// @route   GET /api/posts
// @access  Public or Private (depending on your preference)
router.get('/', postController.getFeed);

// @desc    Create a new post (With automatic AI safety scanning)
// @route   POST /api/posts
// @access  Private
router.post('/', protect, postController.createPost);

// @desc    Toggle like / unlike on a post
// @route   PUT /api/posts/:id/like
// @access  Private
router.put('/:id/like', protect, postController.toggleLike);

module.exports = router;