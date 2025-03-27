import axios from 'axios';

export const getLocationFromCoords = async (lat, lng) => {
  try {
    console.log(`📍 Fetching address for: Latitude: ${lat}, Longitude: ${lng}`);

    const res = await axios.get(`${process.env.REACT_APP_API_URL}/location/reverse`, {
      params: { lat, lon: lng }
    });

    console.log('🌍 Full Response:', res.data);

    if (res.data?.address) {
      const { road, house_number, suburb, city, state, country } = res.data.address;

      // ✅ Get the street name directly from `road`
      const streetName = road || 'Street not found';

      const formattedAddress = [house_number, road, suburb, city, state, country]
        .filter(Boolean)
        .join(', ');

      console.log(`✅ Street name: ${streetName}`);
      console.log(`✅ Full address: ${formattedAddress}`);

      return { streetName, formattedAddress };
    } else {
      throw new Error('No address found');
    }
  } catch (err) {
    console.error('❌ Reverse geocoding failed:', err.message);
    return { streetName: 'Street not found', formattedAddress: 'Address not found' };
  }
};
