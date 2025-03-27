const express = require('express');
const { registerUser } = require('../controllers/userController');

const router = express.Router();

router.post('/register', (req, res) => {
    console.log('📥 POST request received at /register');
  });
   // ✅ Fix here

module.exports = router;
