const express = require('express');
const { registerUser } = require('../controllers/userController'); // Import controller

const router = express.Router();

// Ensure POST method is used for registration
router.post('/register', registerUser);

module.exports = router;
