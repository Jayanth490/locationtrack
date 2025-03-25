const express = require('express');
const cors = require('cors');
const db = require('./config/db'); // Database connection
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/users', userRoutes); // <-- Problem might be here!

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
