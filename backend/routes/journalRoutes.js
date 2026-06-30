const express = require('express');
const router = express.Router();
const journalController = require('../controllers/journalController');
const protect = require('../middleware/authMiddleware'); // Adjust import structure/path to match your app

// Base Route: /api/journals
router.route('/')
  .post(protect, journalController.createEntry)
  .get(protect, journalController.getEntries);

// Single Item Route: /api/journals/:id
router.route('/:id')
  .get(protect, journalController.getEntryById);

module.exports = router;