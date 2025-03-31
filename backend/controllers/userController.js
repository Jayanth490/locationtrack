import { createUser, getUserByPhoneNumber } from '../models/User.js';

export const registerUser = async (req, res) => {
  const { name, phoneNumber, lat, lng } = req.body;

  // ✅ Validate input fields
  if (!name || !phoneNumber || !lat || !lng) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // ✅ Check if user already exists by phone number
    const existingUser = await getUserByPhoneNumber(phoneNumber);

    if (existingUser) {
      return res.status(200).json({ message: 'User already exists. Location updated!' });
    }

    // ✅ Create new user if not exists
    const newUser = await createUser(name, phoneNumber, lat, lng);

    return res.status(201).json({
      message: 'User registered successfully',
      user: newUser,
    });
  } catch (err) {
    console.error('❌ Registration failed:', err.message);
    return res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

export default registerUser;
