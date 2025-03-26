const express = require('express');
const cors = require('cors');
const db = require('./config/db'); // Database connection
const userRoutes = require('./routes/userRoutes');

const app = express();
const locationRoutes = require('./routes/locationRoutes');

app.use('/api/location', locationRoutes);

// ✅ Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // ✅ Allow frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // ✅ Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // ✅ Allowed headers
  credentials: true // ✅ Allow credentials (if needed)
}));

// ✅ Define route correctly
app.use('/api/users', userRoutes);

// ✅ Root endpoint to check if the server is running
app.get('/', (req, res) => {
  res.send('🚀 Server is running!');
});

// ✅ Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err.message);
  res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
