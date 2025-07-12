// src/components/PrivateRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom'; // Used to redirect users to another route

/**
 * PrivateRoute is a component that protects routes from being accessed
 * by users who are not authenticated (i.e., users without a token).
 *
 * @param {ReactNode} children - The protected component/page to render if authenticated
 * @returns The protected component if authenticated, otherwise redirects to /login
 */
function PrivateRoute({ children }) {
  // 🔑 Get the token from localStorage (saved at login or register)
  const token = localStorage.getItem('token');

  // ✅ If token exists, user is authenticated → show the protected component
  // ❌ If no token, redirect them to /login
  return token ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
