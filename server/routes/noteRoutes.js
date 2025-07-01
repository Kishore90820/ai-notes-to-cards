const express = require('express')
const router = express.Router()

// 🛡 Middleware to protect routes (requires login)
const protect = require('../middleware/authMiddleware')

// 📦 Import controller functions
const {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote
} = require('../controllers/noteController')

// 📝 Create a new note
router.post('/', protect, createNote)

// 📚 Get all notes for the logged-in user
router.get('/', protect, getNotes)

// 📄 Get a specific note
router.get('/:id', protect, getNoteById)

// ✏️ Update a note
router.put('/:id', protect, updateNote)

// ❌ Delete a note
router.delete('/:id', protect, deleteNote)

module.exports = router
