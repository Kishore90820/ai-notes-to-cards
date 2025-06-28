const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
  createFlashcard,
  getFlashcards,
  getFlashcardById,
  updateFlashcard,
  deleteFlashcard
} = require('../controllers/flashcardController');

// Create a flashcard
router.post('/', protect, createFlashcard);

// Get all flashcards for user
router.get('/', protect, getFlashcards);

// Get a single flashcard
router.get('/:id', protect, getFlashcardById);

// Update a flashcard
router.put('/:id', protect, updateFlashcard);

// Delete a flashcard
router.delete('/:id', protect, deleteFlashcard);

module.exports = router;
