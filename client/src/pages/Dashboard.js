import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

function Dashboard() {
  const [flashcards, setFlashcards] = useState([]);
  const [form, setForm] = useState({ question: '', answer: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // 🔁 Fetch flashcards on load
  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      const res = await axiosInstance.get('/flashcards');
      setFlashcards(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch flashcards');
    }
  };

  // 🔄 Handle form changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 📝 Submit new flashcard
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await axiosInstance.post('/flashcards', form);
      setSuccess('Flashcard created!');
      setForm({ question: '', answer: '' });
      setFlashcards([res.data, ...flashcards]); // Add new flashcard to list
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create flashcard');
    }
  };

  return (
    <div>
      <h2>Your Flashcards</h2>

      {/* ✅ Create Flashcard Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="question"
          placeholder="Question"
          value={form.question}
          onChange={handleChange}
          required
        /><br />
        <input
          type="text"
          name="answer"
          placeholder="Answer"
          value={form.answer}
          onChange={handleChange}
          required
        /><br />
        <button type="submit">Create Flashcard</button>
      </form>

      {/* 🔔 Feedback */}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* 🧠 List of flashcards */}
      {flashcards.length === 0 ? (
        <p>No flashcards yet.</p>
      ) : (
        <ul>
          {flashcards.map((card) => (
            <li key={card._id}>
              <strong>Q:</strong> {card.question} <br />
              <strong>A:</strong> {card.answer}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
