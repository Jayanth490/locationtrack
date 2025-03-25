import React, { useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const containerStyle = {
  width: '100%',
  height: '400px'
};

function LocationFilter() {
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');

  const handleSearch = async () => {
    console.log('Search button clicked');
    console.log('Phone:', phone);

    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/location/${phone}`);
      console.log('Response:', res);

      if (res.data) {
        const lat = parseFloat(res.data.latitude);
        const lng = parseFloat(res.data.longitude);

        if (!isNaN(lat) && !isNaN(lng)) {
          const loc = { lat, lng };
          setLocation(loc);

          // Get Address using lat, lng
          const fetchedAddress = `Lat: ${lat}, Lng: ${lng}`;
          console.log('Fetched Address:', fetchedAddress);
          setAddress(fetchedAddress);
        } else {
          console.error('Invalid latitude or longitude:', lat, lng);
          alert('Invalid location data received.');
        }
      }
    } catch (err) {
      console.error('Location fetch failed:', err);
      alert('Failed to fetch location. Please try again.');
    }
  };

  return (
    <div>
      <h2>Find Location</h2>
      <input
        type="text"
        placeholder="Enter Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {location && (
        <MapContainer center={location} zoom={15} style={containerStyle}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={location}>
            <Popup>
              {address || 'Fetching address...'}
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
}

export default LocationFilter;
