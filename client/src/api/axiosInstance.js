import axios from 'axios';

// Create an Axios instance with a base URL for all API calls
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001/api', // Base URL for your backend API
});

// Request interceptor: runs before every request
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the JWT token from localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // If token exists, add it to the Authorization header as a Bearer token
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Return the updated config so the request can proceed
    return config;
  },
  (error) => {
    // If there's an error setting up the request, reject the promise
    return Promise.reject(error);
  }
);

// Response interceptor: runs after every response or error
axiosInstance.interceptors.response.use(
  (response) => {
    // If response is successful (2xx), just pass it through unchanged
    return response;
  },
  (error) => {
    // If there is an error in the response...
    if (error.response && error.response.status === 401) {
      // If status is 401 Unauthorized, this usually means token expired or invalid
      
      // Remove the expired or invalid token from localStorage
      localStorage.removeItem('token');
      
      // Redirect the user to the login page to re-authenticate
      window.location.href = '/login';
    }
    // Reject the promise so the error can still be handled downstream if needed
    return Promise.reject(error);
  }
);

export default axiosInstance;
