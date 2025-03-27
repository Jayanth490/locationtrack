import React, { useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const containerStyle = {
  width: '100%',
  height: '400px',
  marginTop: '10px',
  borderRadius: '8px',
  overflow: 'hidden',
};

function LocationFilter() {
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!/^[0-9]{10}$/.test(phone)) {
      alert('❌ Please enter a valid 10-digit phone number');
      return;
    }
  
    setLoading(true);
    setAddress('');
  
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/location/${phone}`);
      console.log('✅ Response:', res.data);
  
      if (res.data) {
        const { latitude, longitude, address } = res.data;
  
        if (!isNaN(latitude) && !isNaN(longitude)) {
          setLocation({ lat: latitude, lng: longitude });
          setAddress(address || '❌ Address not found.');
        } else {
          setAddress('❌ Invalid location data received.');
        }
      }
    } catch (err) {
      console.error('❌ Location fetch failed:', err);
      setAddress(err.response?.data?.message || '❌ Failed to fetch location. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>🔎 Find Location</h2>
      <input
        type="text"
        placeholder="Enter Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{
          padding: '10px',
          width: '80%',
          maxWidth: '300px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          marginBottom: '10px',
          fontSize: '16px',
          outline: 'none',
        }}
        disabled={loading}
      />
      <button
        onClick={handleSearch}
        style={{
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginLeft: '10px',
          fontSize: '16px',
          transition: 'background 0.3s',
          opacity: loading ? 0.7 : 1,
        }}
        disabled={loading}
      >
        {loading ? 'Searching...' : 'Search'}
      </button>

      {location && (
        <MapContainer
          center={location}
          zoom={15}
          key={`${location.lat}-${location.lng}`} // Ensures map re-renders correctly
          style={containerStyle}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={location}>
            <Popup>{address || 'Fetching address...'}</Popup>
          </Marker>
        </MapContainer>
      )}

      {address && (
        <p style={{ marginTop: '10px', color: '#555' }}>{address}</p>
      )}
    </div>
  );
}

export default LocationFilter;
