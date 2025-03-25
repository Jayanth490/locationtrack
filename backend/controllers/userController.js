const { createUser, getUserByPhoneNumber } = require('../models/User');

// ✅ Register User
const registerUser = async (req, res) => {
  const { name, phoneNumber, lat, lng } = req.body;

  console.log('📥 Incoming registration request:', req.body);

  // ✅ Validate input fields
  if (!name || !phoneNumber || !lat || !lng) {
    console.error('❌ Missing fields');
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    console.log('✅ Attempting to create user...');
    const user = await createUser(name, phoneNumber, lat, lng);
    console.log('✅ User created successfully:', user);

    return res.status(201).json({
      id: user.id,
      name: user.name,
      phoneNumber: user.phoneNumber, // ✅ Fixed naming consistency
      latitude: user.latitude,
      longitude: user.longitude
    });
  } catch (error) {
    if (error.code === '23505') {
      // Handle duplicate phone number
      console.error('❌ Duplicate phone number:', error.message);
      return res.status(400).json({ message: 'Phone number already exists' });
    }

    console.error('❌ Registration failed:', error.message);
    return res.status(500).json({ message: 'Failed to register user' });
  }
};

// ✅ Get Location by Phone Number
const getLocationByPhone = async (req, res) => {
  const { phoneNumber } = req.params;

  console.log(`📞 Fetching location for phone number: ${phoneNumber}`);

  try {
    const user = await getUserByPhoneNumber(phoneNumber);
    if (user) {
      console.log('✅ User location found:', user);

      return res.status(200).json({
        name: user.name,
        phoneNumber: user.phoneNumber, // ✅ Fixed naming consistency
        latitude: user.latitude,
        longitude: user.longitude
      });
    } else {
      console.warn('⚠️ User not found');
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('❌ Error fetching location:', error.message);
    return res.status(500).json({ message: 'Failed to fetch location' });
  }
};

module.exports = { registerUser, getLocationByPhone };
