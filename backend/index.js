const express = require('express');
const cors = require('cors');
const db = require('./config/db'); // Database connection
const userRoutes = require('./routes/userRoutes');
const locationRoutes = require('./routes/locationRoutes');

const app = express();

// ✅ Middleware should be defined before routes
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// ✅ Define routes after middleware
app.use('/api/users', userRoutes);
app.use('/api/location', locationRoutes);

// ✅ Root endpoint to check if the server is running
app.get('/', (req, res) => {
  res.send('🚀 Server is running!');
});

// ✅ Error handling middleware (keep at the end)
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err.message);
  res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
