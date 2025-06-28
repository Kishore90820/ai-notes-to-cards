const Flashcard = require('../models/Flashcard');

// POST /api/flashcards
const createFlashcard = async (req, res) => {
  const { question, answer } = req.body; //destructures question and answer from the incoming request

  try {
    // 🔍 Check if an identical flashcard already exists for the same user and has same question and answer
    const existingCard = await Flashcard.findOne({
      user: req.user.id, //comes from authMiddleware where we attached the logged-in user to the request
      question,
      answer,
    });

    //if the card exists, exit and return an error
    if (existingCard) {
      return res.status(400).json({ message: 'This flashcard already exists' });
    }

    // ✅ Create new flashcard if we pass the duplicate check
    const flashcard = await Flashcard.create({
      user: req.user.id,
      question,
      answer,
    });

    //send success response (201 = created) and return the flashcard to client
    res.status(201).json(flashcard);
  } catch (error) {
    console.error('Error creating flashcard:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Get all flashcards for the authenticated user GET /api/flashcards
const getFlashcards = async (req, res) => {
  try {
    //Find all flashcards where the user field maches the current-logged in user and sort them by newest first
    const flashcards = await Flashcard.find({ user: req.user._id }).sort({ createdAt: -1 });
    //returns the flashcards with a success (200 OK) status
    res.status(200).json(flashcards);
  } catch (err) {
    console.error('❌ Error fetching flashcards:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
// 📌 GET a single flashcard by ID
const getFlashcardById = async (req, res) => {
  try {
    const flashcard = await Flashcard.findOne({ _id: req.params.id, user: req.user.id });
    if (!flashcard) return res.status(404).json({ message: "Flashcard not found" });
    res.status(200).json(flashcard);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✏️ UPDATE a flashcard
const updateFlashcard = async (req, res) => {
  const { question, answer } = req.body;

  try {
    const flashcard = await Flashcard.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { question, answer },
      { new: true } // return the updated document
    );

    if (!flashcard) return res.status(404).json({ message: "Flashcard not found" });

    res.status(200).json(flashcard);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ❌ DELETE a flashcard
const deleteFlashcard = async (req, res) => {
  try {
    const deleted = await Flashcard.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!deleted) return res.status(404).json({ message: "Flashcard not found" });

    res.status(200).json({ message: "Flashcard deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createFlashcard,
  getFlashcards,
  getFlashcardById,
  updateFlashcard,
  deleteFlashcard
};