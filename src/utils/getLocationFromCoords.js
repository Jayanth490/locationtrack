import axios from 'axios';
 export const getLocationFromCoords = async (lat, lng) => {
    try {
      console.log(`📍 Fetching address for: Latitude: ${lat}, Longitude: ${lng}`);
  
      const res = await axios.get('https://nominatim.openstreetmap.org/reverse', {
        params: {
          lat,
          lon: lng,
          format: 'json',
          zoom: 18,
          addressdetails: 1
        },
        headers: {
          'User-Agent': 'YourAppName/1.0' // ✅ Required by Nominatim
        }
      });
  
      console.log('🌍 Full Response:', res.data);
  
      if (res.data.error) {
        throw new Error(res.data.error);
      }
  
      if (res.data?.address) {
        const { house_number, road, suburb, city, state, country } = res.data.address;
        const formattedAddress = [house_number, road, suburb, city, state, country]
          .filter(Boolean) // ✅ Remove empty values
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
  