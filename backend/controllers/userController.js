import { createUser, getUserByPhoneNumber, updateUserLocation } from '../models/userModel.js';

// Get user location and update if phone number exists
export const getUserLocation = async (req, res) => {
  const { phone } = req.params;
  const { lat, lng } = req.query;  // These come from the frontend if user needs an update

  try {
    const user = await getUserByPhoneNumber(phone);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If location parameters are provided, update the user's location
    if (lat && lng) {
      const updatedUser = await updateUserLocation(phone, lat, lng);
      return res.status(200).json({
        phoneNumber: updatedUser.phone_number,
        latitude: updatedUser.latitude,
        longitude: updatedUser.longitude,
        address: 'Location updated successfully',
      });
    }

    // If no location update is needed, just return the current data
    res.json({
      phoneNumber: user.phone_number,
      latitude: user.latitude,
      longitude: user.longitude,
      address: 'Location not updated',
    });

  } catch (err) {
    console.error('❌ Failed to fetch user location:', err);
    res.status(500).json({ message: 'Failed to fetch location' });
  }
};
