const mongoose = require("mongoose")

//Define the Flashcard schema which has 4 fields
const flashcardSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,  // link to the user who created it; going to store the ID of the user who created the flashcard
    ref: "User", // says this objectID refers to a docuement in the User collection and when we call populate, mongoose will auto pull in all the user's info linked to the ID
    required: true //ensures every flashcard is associated with a user
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
  timestamps: true //schema option; mongoose will automatically add two fields to every flashcard (createdAt and updatedAt)
})

//Regsister our schema as a model called flashcard
module.exports = mongoose.model("Flashcard", flashcardSchema)
