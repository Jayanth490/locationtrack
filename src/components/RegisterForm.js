import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from '../utils/axios';
import './RegisterForm.css';
import { getLocationFromCoords } from '../utils/getLocationFromCoords';

function RegisterForm() {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const [loading, setLoading] = useState(false);

  // ✅ Define getLocation at the top level
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          setCoords({ lat, lng });
          toast.success('📍 Location access granted!');

          try {
            // ✅ Use getLocationFromCoords here
            const address = await getLocationFromCoords(lat, lng);
            console.log(`🏡 Address: ${address}`);
            toast.info(`📍 Address: ${address}`);
          } catch (error) {
            console.error('❌ Error getting address:', error);
            toast.error('❌ Failed to fetch address');
          }
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              toast.error('❌ Location permission denied.');
              break;
            case error.POSITION_UNAVAILABLE:
              toast.error('❌ Location unavailable.');
              break;
            case error.TIMEOUT:
              toast.error('❌ Location request timed out.');
              break;
            default:
              toast.error('❌ Failed to get location.');
              break;
          }
        }
      );
    } else {
      toast.error('❌ Geolocation is not supported by this browser.');
    }
  };

  const isValidPhoneNumber = (number) => /^[0-9]{10}$/.test(number);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      const res = await axios.post('/register', {
        name,
        phoneNumber,
        lat: coords.lat,
        lng: coords.lng,
      });

      if (res.status === 201) {
        toast.success('✅ Successfully registered!');
        setName('');
        setPhoneNumber('');
        setCoords({ lat: null, lng: null });
      }
    } catch (err) {
      console.error('Registration error:', err.response?.data || err.message);
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
            disabled={loading}
          >
            📍 Get Location
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
    </div>
  );
}

export default RegisterForm;
