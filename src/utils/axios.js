import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

const instance = axios.create({
  baseURL: `${API_URL}/api`, // ✅ Add `/api` to match backend routes
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;

