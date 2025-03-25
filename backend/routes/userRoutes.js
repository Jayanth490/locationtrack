const express = require('express');
const { registerUser, getLocationByPhone } = require('../controllers/userController'); // ✅ Import only once

const router = express.Router();

router.post('/register', registerUser);
router.get('/location/:phoneNumber', getLocationByPhone); // ✅ Route should be unique

module.exports = router;
