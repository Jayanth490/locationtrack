export const getLocationByPhoneNumber = async (req, res) => {
  const { phoneNumber } = req.params; // Change from req.query to req.params

  if (!phoneNumber) {
    return res.status(400).json({ message: 'Phone number is required' });
  }

  try {
    const user = await getUserByPhoneNumber(phoneNumber);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      phoneNumber: user.phone_number,
      latitude: user.latitude,
      longitude: user.longitude,
      address: 'Fetching address...', // Optional
    });
  } catch (err) {
    console.error('❌ Error fetching location:', err.message);
    res.status(500).json({ message: 'Error fetching location' });
  }
};
