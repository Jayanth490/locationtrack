import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from '../utils/axios'; // ✅ Import instance
import './RegisterForm.css';
import { getLocationFromCoords } from '../utils/getLocationFromCoords';
import MyMap from './MyMap';

function RegisterForm() {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const [loading, setLoading] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false); // Track geolocation progress

  const getLocation = () => {
    if (navigator.geolocation) {
      setGettingLocation(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setCoords({ lat, lng });
          toast.success('📍 Location access granted!');

          try {
            const address = await getLocationFromCoords(lat, lng);
            console.log(`🏡 Address: ${address}`);
            toast.info(`📍 Address: ${address}`);
          } catch (error) {
            console.error('❌ Error getting address:', error);
            toast.error('❌ Failed to fetch address');
          }
        },
        (error) => {
          const errorMessage = {
            1: '❌ Location permission denied.',
            2: '❌ Location unavailable.',
            3: '❌ Location request timed out.',
          }[error.code] || '❌ Failed to get location.';
          toast.error(errorMessage);
        },
        { timeout: 10000 }
      );
    } else {
      toast.error('❌ Geolocation is not supported by this browser.');
    }
  };

  const isValidPhoneNumber = (number) => /^[0-9]{10}$/.test(number);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error('❌ Please enter your name');
      return;
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      toast.error('❌ Invalid phone number');
      return;
    }

    if (!coords.lat || !coords.lng) {
      toast.error('❌ Please get location before registering');
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(`/users/register`, {
        name,
        phoneNumber,
        lat: coords.lat,
        lng: coords.lng,
      });

      if (res.status === 201) {
        toast.success('✅ Successfully registered!');
      } else if (res.status === 200) {
        toast.success('✅ Location updated successfully!');
      }

      // ✅ Clear form fields after success
      setName('');
      setPhoneNumber('');
      setCoords({ lat: null, lng: null });
    } catch (err) {
      console.error('❌ Registration error:', err.response?.data || err.message);
      toast.error(err.response?.data?.message || '❌ Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-heading">Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="register-input"
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          className="register-input"
        />
        <div className="button-group">
          <button
            type="button"
            onClick={getLocation}
            className="register-button"
            disabled={gettingLocation || loading} // Disable while geolocation is being fetched
          >
            {gettingLocation ? 'Getting Location...' : '📍 Get Location'}
          </button>
          <button
            type="submit"
            className={`register-submit-button ${loading ? 'disabled' : ''}`}
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </div>
      </form>

      {/* ✅ Moved MyMap here */}
      {coords.lat && coords.lng && <MyMap lat={coords.lat} lng={coords.lng} />}
    </div>
  );
}

export default RegisterForm;
