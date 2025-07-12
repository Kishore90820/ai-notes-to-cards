// src/pages/Login.js
import React, { useState } from 'react'; // React and the useState hook for managing component state
import axios from 'axios'; // HTTP client for making API requests
import { useNavigate } from 'react-router-dom'; // Hook to programmatically redirect the user

function Login() {
  const navigate = useNavigate(); // To redirect user after successful login

  // Form state for holding email and password input values
  const [form, setForm] = useState({ email: '', password: '' });

  // Error message state (shown to user if login fails)
  const [error, setError] = useState('');

  // Handles changes in input fields (email & password)
  const handleChange = (e) => {
    // Dynamically update the specific field that triggered the change
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handles form submission (login attempt)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submit behavior (page refresh)
    setError(''); // Clear any existing errors

    try {
      // Make POST request to backend login route with form data
      const res = await axios.post('http://localhost:5001/api/users/login', form);

      // Save the returned JWT token to localStorage for later use (auth headers)
      localStorage.setItem('token', res.data.token);

      // Redirect to dashboard/homepage on successful login
      navigate('/');
    } catch (err) {
      // If login fails, set error message to show on screen
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  // Component UI
  return (
    <div>
      <h2>Login</h2>
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
        <button type="submit">Login</button>
      </form>

      {/* Display error message if there is one */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Login; // Export component so it can be used elsewhere (e.g., in App.js)
