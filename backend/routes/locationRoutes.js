import axios from 'axios';
import express from 'express';
const router = express.Router();

router.get('/reverse', async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
      params: { lat, lon, format: 'json', zoom: 18, addressdetails: 1 }
    });

    if (response.data?.display_name) {
      res.json({ address: response.data.display_name });
    } else {
      res.status(404).json({ error: 'No address found' });
    }
  } catch (err) {
    console.error('❌ Reverse geocoding failed:', err.message);
    res.status(500).json({ error: 'Failed to fetch address' });
  }
});

<<<<<<< HEAD
=======

>>>>>>> 55d26f45f02697479264579f05e96410dec856c8
export default router;
