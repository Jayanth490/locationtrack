import express from 'express';
import axios from 'axios';


const router = express.Router();
const cors = require('cors');
// ✅ Use CORS with the correct origin
router.use(cors({
  origin: 'https://locationtrack-omega.vercel.app',
  methods: ['GET'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // If you are dealing with cookies or sessions
}));

// ✅ Reverse geocoding route
router.get('/reverse', async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
      params: {
        lat,
        lon,
        format: 'json',
        zoom: 18,
        addressdetails: 1
      }
    });

    console.log("Response from geocoding:", response.data); // Log the response to debug

    // Check if response has address details
    if (response.data && response.data.display_name) {
      res.json({ address: response.data.display_name });
    } else {
      res.status(404).json({ error: 'No address found for the provided coordinates' });
    }
  } catch (err) {
    console.error('❌ Reverse geocoding failed:', err.message);
    res.status(500).json({ error: 'Failed to fetch address' });
  }
});

module.exports = router;
