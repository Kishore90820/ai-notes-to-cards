// src/pages/Register.js

import React, { useState } from 'react'; // React and useState for local component state
import axios from 'axios'; // Axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; // Hook to programmatically navigate pages

function Register() {
  const navigate = useNavigate(); // To redirect the user after successful registration

  // State to hold form values (email and password)
  const [form, setForm] = useState({ email: '', password: '' });

  // State to hold error messages
  const [error, setError] = useState('');

  // Called whenever user types into an input field
  const handleChange = (e) => {
    // Update the corresponding field in the form state (email or password)
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Called when the form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent full page reload
    setError(''); // Clear any previous error messages

    try {
      // Send POST request to backend with form data
      const res = await axios.post('http://localhost:5001/api/users/register', form);

      // Save JWT token in localStorage (used to authorize future requests)
      localStorage.setItem('token', res.data.token);

      // Redirect to dashboard/home page after successful registration
      navigate('/');
    } catch (err) {
      // If there's an error, show an error message
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>

      {/* Form for registration */}
      <form onSubmit={handleSubmit}>
        {/* Email input field */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        /><br />

        {/* Password input field */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        /><br />

        {/* Submit button */}
        <button type="submit">Register</button>
      </form>

      {/* Show error message if registration fails */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Register; // Export the Register component for use in routing
