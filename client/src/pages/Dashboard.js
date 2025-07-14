import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

function Dashboard() {
  const [notes, setNotes] = useState('');
  const [generatedFlashcards, setGeneratedFlashcards] = useState([]);
  const [savedFlashcards, setSavedFlashcards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // 🔁 Fetch user's saved flashcards on load
  useEffect(() => {
    fetchSavedFlashcards();
  }, []);

  const fetchSavedFlashcards = async () => {
    try {
      const res = await axiosInstance.get('/flashcards');
      setSavedFlashcards(res.data);
    } catch (err) {
      console.error('Error fetching saved flashcards:', err);
    }
  };

  // 🧠 Generate flashcards from notes
  const handleGenerate = async () => {
    setLoading(true);
    setMessage('');
    try {
      const res = await axiosInstance.post('/flashcard-generator/from-notes', { notes });
      setGeneratedFlashcards(res.data);
      setMessage('✅ Flashcards generated!');
    } catch (err) {
      setMessage('❌ Failed to generate flashcards.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 💾 Save generated flashcards to database
  const handleSave = async () => {
    if (generatedFlashcards.length === 0) return;
    setLoading(true);
    setMessage('');
    try {
      await axiosInstance.post('/flashcards/bulk', { flashcards: generatedFlashcards });
      setMessage('✅ Flashcards saved to your account!');
      setGeneratedFlashcards([]);
      fetchSavedFlashcards();
    } catch (err) {
      setMessage('❌ Failed to save flashcards.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>AI Flashcard Generator</h2>

      {/* ✏️ Notes Input */}
      <textarea
        rows="8"
        cols="60"
        placeholder="Paste your notes here..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        style={{ width: '100%', marginBottom: '10px' }}
      />

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button onClick={handleGenerate} disabled={loading}>🧠 Generate Flashcards</button>
        <button onClick={handleSave} disabled={loading || generatedFlashcards.length === 0}>💾 Save to My Flashcards</button>
      </div>

      {/* 🔔 Feedback */}
      {message && <p><strong>{message}</strong></p>}
      {loading && <p>Loading...</p>}

      {/* 📋 Generated Flashcards */}
      {generatedFlashcards.length > 0 && (
        <div>
          <h3>Generated Flashcards</h3>
          <ul>
            {generatedFlashcards.map((card, index) => (
              <li key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                <strong>Q:</strong> {card.question} <br />
                <strong>A:</strong> {card.answer}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 💾 Saved Flashcards */}
      {savedFlashcards.length > 0 && (
        <div>
          <h3>Your Saved Flashcards</h3>
          <ul>
            {savedFlashcards.map((card) => (
              <li key={card._id} style={{ border: '1px solid #eee', padding: '8px', marginBottom: '6px' }}>
                <strong>Q:</strong> {card.question} <br />
                <strong>A:</strong> {card.answer}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
