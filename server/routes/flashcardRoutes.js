const express = require('express');
const router = express.Router();

const { createFlashcard, getFlashcards } = require('../controllers/flashcardController');
const protect = require('../middleware/authMiddleware');

// 🔐 All routes are protected, so only logged-in users can access them

// 📝 POST /api/flashcards → create a new flashcard
router.post('/', protect, createFlashcard);

// 📥 GET /api/flashcards → get all flashcards for the logged-in user
router.get('/', protect, getFlashcards);

module.exports = router;
