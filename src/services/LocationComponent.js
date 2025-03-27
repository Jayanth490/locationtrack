import { getLocationFromCoords } from '../utils/getLocationFromCoords';

const handleSearch = async () => {
  const { addressFound, formattedAddress } = await getLocationFromCoords(lat, lng);

  if (addressFound) {
    console.log(`✅ Address found: ${formattedAddress}`);
  } else {
    console.log(`❌ Address not found: ${formattedAddress}`);
  }
};
