const express = require('express');
const cors = require('cors');
const db = require('./config/db'); // Database connection (ensure it's correctly set up)
const userRoutes = require('./routes/userRoutes'); // Import userRoutes

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(cors({
  origin: [
    'https://locationtrack-omega.vercel.app',  // Your frontend URL
    'http://localhost:3000',  // Local frontend URL for development
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// ✅ Define routes
app.use('/api/users', userRoutes);  // Attach userRoutes here

// ✅ Root endpoint to check if the server is running
app.get('/', (req, res) => {
  res.send('🚀 Server is running!');
});

// ✅ Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err.message);
  res.status(500).json({ message: 'Internal server error' });
});

// ✅ Server port setup
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
