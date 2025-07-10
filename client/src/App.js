import React from 'react';
// 📦 Import React Router tools to handle navigation
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 📄 Import the pages that will be shown on different URLs
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    // 🌐 Wrap entire app in a Router to enable routing functionality
    <Router>
      <Routes>
        {/* 🏠 When user goes to the homepage ("/"), show Dashboard */}
        <Route path="/" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
         
        } />
        
        {/* 🔐 When user goes to "/login", show the Login page */}
        <Route path="/login" element={<Login />} />

        {/* 📝 When user goes to "/register", show the Register page */}
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

// ✅ Export the App component so it can be used in index.js
export default App;
