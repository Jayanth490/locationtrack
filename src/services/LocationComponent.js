import { getLocationFromCoords } from '../utils/getLocationFromCoords';

const handleSearch = async () => {
  const { streetName, formattedAddress } = await getLocationFromCoords(lat, lng);
  console.log(`Street: ${streetName}`);
  console.log(`Full Address: ${formattedAddress}`);
};
