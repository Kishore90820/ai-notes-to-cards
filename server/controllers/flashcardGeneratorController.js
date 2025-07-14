// controllers/flashcardGeneratorController.js

// Simple rule-based flashcard generator from notes
function generateFlashcardsFromNotes(notes) {
  const sentences = notes
    .split('.')
    .map(s => s.trim())
    .filter(Boolean);

  const keywords = [' is ', ' are ', ' means ', ' refers to ', ' called ', ' describes ', ' defines '];

  const flashcards = sentences.map(sentence => {
    for (const kw of keywords) {
      if (sentence.toLowerCase().includes(kw)) {
        const parts = sentence.split(new RegExp(kw, 'i'));
        const questionPart = parts[0].trim();
        const answerPart = parts[1] ? parts[1].trim() : '';

        const question = `What ${kw.trim()} ${questionPart}?`.replace(/\s+/g, ' ').trim();
        const answer = answerPart || sentence;

        return { question, answer };
      }
    }
    return null;
  }).filter(Boolean);

  return flashcards;
}

const generateFlashcards = (req, res) => {
  const { notes } = req.body;

  if (!notes) {
    return res.status(400).json({ message: 'Notes are required' });
  }

  const flashcards = generateFlashcardsFromNotes(notes);
  return res.json(flashcards);
};

module.exports = {
  generateFlashcards,
};
