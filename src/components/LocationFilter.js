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
    if (!/^[0-9]{10}$/.test(phone)) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }

    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/location/${phone}`);
      console.log('Response:', res.data);

      if (res.data) {
        const lat = parseFloat(res.data.latitude);
        const lng = parseFloat(res.data.longitude);

        if (!isNaN(lat) && !isNaN(lng)) {
          setLocation({ lat, lng });
          setAddress(`Lat: ${lat}, Lng: ${lng}`);
        } else {
          setAddress('Invalid location data received.');
        }
      }
    } catch (err) {
      console.error('Location fetch failed:', err);
      setAddress('Failed to fetch location. Please try again.');
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
        <MapContainer center={location} zoom={15} key={`${location.lat}-${location.lng}`} style={containerStyle}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={location}>
            <Popup>{address || 'Fetching address...'}</Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
}

export default LocationFilter;
