import axios from 'axios';

export const getLocationFromCoords = async (lat, lng) => {
  try {
    console.log(`📍 Fetching address for: Latitude: ${lat}, Longitude: ${lng}`);

    const res = await axios.get('http://localhost:5000/api/location/reverse', {
      params: { lat, lon: lng },
    });

    console.log('🌍 Full Response:', res.data);

    if (res.data?.address) {
      const { house_number, road, suburb, city, state, country } = res.data.address;
      const formattedAddress = [house_number, road, suburb, city, state, country]
        .filter(Boolean)
        .join(', ');

      console.log(`✅ Found address: ${formattedAddress}`);
      return formattedAddress || 'Address not found';
    } else {
      throw new Error('No address found');
    }
  } catch (err) {
    console.error('❌ Reverse geocoding failed:', err.message);
    return 'Address not found';
  }
};
