const mongoose = require("mongoose")

const flashcardSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,  // link to the user who created it
    ref: "User",
    required: true
  },
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model("Flashcard", flashcardSchema)
