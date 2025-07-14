// routes/flashcardGeneratorRoutes.js
const express = require('express');
const router = express.Router();

const { generateFlashcards } = require('../controllers/flashcardGeneratorController');

router.post('/from-notes', generateFlashcards);

module.exports = router;
