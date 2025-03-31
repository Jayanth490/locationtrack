import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://locationtrack-3inh.onrender.com/api';

export const registerUser = async (data) => {
  try {
    // You can add checks for required fields here if necessary
    if (!data.name || !data.phoneNumber || !data.lat || !data.lng) {
      throw new Error('All fields are required!');
    }

    const res = await axios.post(`${API_URL}/users/register`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return res.data;
  } catch (error) {
    // Log the error and throw a custom error for UI
    console.error('❌ Registration error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Registration failed, please try again');
  }
};
