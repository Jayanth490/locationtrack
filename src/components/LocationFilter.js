import React, { useState, useEffect } from 'react';
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
    const sanitizedPhone = phone.trim().replace(/\s+/g, ''); // Remove spaces

    if (!/^\d{10}$/.test(sanitizedPhone)) {
      alert('❌ Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);
    setAddress('');

    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/location/${sanitizedPhone}`);
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
      console.error('❌ Location fetch failed:', err.message);
      setAddress(err.response?.data?.message || '❌ Failed to fetch location. Please try again.');
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
  const handleUpdateLocation = async (newLat, newLng) => {
    if (!newLat || !newLng) {
      alert('❌ Please provide valid coordinates for location update.');
      return;
    }

    setLoading(true);

    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/location/${phone}`, {
        params: { lat: newLat, lng: newLng },  // Sending updated location
      });
      console.log('✅ Location updated:', res.data);
      setLocation({ lat: newLat, lng: newLng });
      setAddress(res.data.address || '❌ Address not found');
    } catch (err) {
      console.error('❌ Failed to update location:', err);
      setAddress('❌ Failed to update location. Please try again.');
    } finally {
      setLoading(false);
    }
  };

=======
>>>>>>> 55d26f45f02697479264579f05e96410dec856c8
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

      {loading && <p>Loading...</p>}

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

      {/* Optional form to update location */}
      <div style={{ marginTop: '20px' }}>
        <h3>📍 Update Location</h3>
        <input
          type="number"
          placeholder="New Latitude"
          id="newLat"
          style={{ margin: '5px' }}
        />
        <input
          type="number"
          placeholder="New Longitude"
          id="newLng"
          style={{ margin: '5px' }}
        />
        <button
          onClick={() => {
            const newLat = parseFloat(document.getElementById('newLat').value);
            const newLng = parseFloat(document.getElementById('newLng').value);
            handleUpdateLocation(newLat, newLng);
          }}
          style={{
            padding: '10px 20px',
            backgroundColor: '#ff9900',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '10px',
          }}
        >
          Update Location
        </button>
      </div>
    </div>
  );
}

export default LocationFilter;
