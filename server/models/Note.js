const mongoose = require("mongoose")

//Create a note schema that  takes in longofrm notes that will then turn into a flashcard (short, concise and structured)
const noteSchema = new mongoose.Schema({
  //Every. note must belong to a user
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  content: {
    type: String,
    required: true
  },
  // title field for the flashcard; not required
  title: {
    type: String
  }
}, {
  timestamps: true
})

module.exports = mongoose.model("Note", noteSchema)
