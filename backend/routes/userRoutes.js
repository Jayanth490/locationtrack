import express from 'express';
import { getUserLocation, registerUser } from '../controllers/userController.js';

const router = express.Router();

// Get user location by phone number
router.get('/location/:phone', getUserLocation);

// Register a new user
router.post('/register', registerUser);

export default router;
