import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL || 'http://your-backend-url.com/api'; // Replace with your correct URL

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Example: Add a request interceptor to add an authorization token
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken'); // Example for JWT token
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Example: Add a response interceptor
instance.interceptors.response.use(
  (response) => response, // Return the response if successful
  (error) => {
    // Handle error globally here (e.g., log out user if 401 Unauthorized)
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized - Please log in.');
      // Redirect or handle accordingly
    }
    return Promise.reject(error);
  }
);

export default instance;
