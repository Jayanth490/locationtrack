import express from 'express';
import cors from 'cors';
import db from './config/db.js'; // Ensure the file extension is included
import userRoutes from './routes/userRoutes.js'; // Ensure the file extension is included

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

// ✅ Add this to start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

export default app;
