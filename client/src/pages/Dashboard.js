import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance'; // Axios instance with token pre-attached

function Dashboard() {
  // Flashcard data from server
  const [flashcards, setFlashcards] = useState([]);

  // New flashcard form fields
  const [form, setForm] = useState({ question: '', answer: '' });

  // Feedback messages
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // 🔁 Fetch flashcards when component mounts
  useEffect(() => {
    fetchFlashcards();
  }, []);

  // 📥 Load flashcards from backend
  const fetchFlashcards = async () => {
    try {
      const res = await axiosInstance.get('/flashcards'); // GET /api/flashcards
      setFlashcards(res.data); // Set the state with the response
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch flashcards');
    }
  };

  // 🔄 Handle user input in form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value }); // Dynamic update
  };

  // 📝 Handle form submission to create new flashcard
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setError('');
    setSuccess('');

    try {
      const res = await axiosInstance.post('/flashcards', form); // POST /api/flashcards
      setSuccess('Flashcard created!');

      // Clear form
      setForm({ question: '', answer: '' });

      // Add new card to the top of the list
      setFlashcards([res.data, ...flashcards]);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create flashcard');
    }
  };

  return (
    <div>
      <h2>Your Flashcards</h2>

      {/* ✅ Form to create flashcard */}
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

      {/* 🔔 Show success/error feedback */}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* 🧠 Flashcard List */}
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
