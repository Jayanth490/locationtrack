import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

export const registerUser = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/users/register`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (error) {
    console.error('❌ Registration error:', error.response?.data || error.message);
    throw error;
  }
};
