import axios from "axios";
export const getLocationFromCoords = async (lat, lng) => {
  try {
    console.log(`📍 Fetching address for: Latitude: ${lat}, Longitude: ${lng}`);

    const res = await axios.get(`${process.env.REACT_APP_API_URL}/location/reverse`, {
      params: { lat, lon: lng },
    });

    console.log('🌍 Full Response:', res.data);

    if (res.data?.address) {
      const { city, state, country } = res.data.address;

      // Check if any component exists and return the formatted address
      const formattedAddress = [city, state, country]
        .filter(Boolean)
        .join(', ') || 'Address not found';

      // If any part of the address is available, consider it "address found"
      const addressFound = formattedAddress !== 'Address not found';

      console.log(`✅ Address found: ${addressFound}`);
      console.log(`✅ Full address: ${formattedAddress}`);

      return { addressFound, formattedAddress };
    } else {
      throw new Error('No address found');
    }
  } catch (err) {
    console.error('❌ Reverse geocoding failed:', err.message);
    
    // Return a fallback message if the geocoding fails
    return {
      addressFound: false,
      formattedAddress: 'Address not found. Could not retrieve location.',
    };
  }
};
