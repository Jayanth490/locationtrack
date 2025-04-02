import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';

const app = express();

// Middleware for CORS and JSON parsing
app.use(express.json());
app.use(cors({
  origin: ['https://yourfrontendurl.com', 'http://localhost:3000'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Routes
app.use('/api/users', userRoutes);

// Basic check endpoint
app.get('/', (req, res) => {
  res.send('🚀 Server is running!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
