const Note = require('../models/Note')

// 📝 CREATE a new note
// POST /api/notes
const createNote = async (req, res) => {
  const { title, content } = req.body

  try {
    const note = await Note.create({
      user: req.user.id,
      title,
      content
    })

    res.status(201).json(note)
  } catch (err) {
    console.error('Error creating note:', err)
    res.status(500).json({ message: 'Server error' })
  }
}

// 📚 GET all notes for the authenticated user
// GET /api/notes
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 })
    res.status(200).json(notes)
  } catch (err) {
    console.error('Error getting notes:', err)
    res.status(500).json({ message: 'Server error' })
  }
}

// 📄 GET a single note by ID
// GET /api/notes/:id
const getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user.id })
    if (!note) return res.status(404).json({ message: 'Note not found' })
    res.status(200).json(note)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// ✏️ UPDATE a note
// PUT /api/notes/:id
const updateNote = async (req, res) => {
  const { title, content } = req.body

  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, content },
      { new: true } // return updated version
    )

    if (!note) return res.status(404).json({ message: 'Note not found' })

    res.status(200).json(note)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// ❌ DELETE a note
// DELETE /api/notes/:id
const deleteNote = async (req, res) => {
  try {
    const deleted = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    })

    if (!deleted) return res.status(404).json({ message: 'Note not found' })

    res.status(200).json({ message: 'Note deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote
}
