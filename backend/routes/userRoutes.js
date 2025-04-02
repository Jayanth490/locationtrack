import express from 'express';
import { getUserLocation, registerUser } from '../controllers/userController.js';

const router = express.Router();

// Get user location by phone number
router.get('/location/:phone', getUserLocation);

<<<<<<< HEAD
// Register a new user
router.post('/register', registerUser);

=======
>>>>>>> 55d26f45f02697479264579f05e96410dec856c8
export default router;
