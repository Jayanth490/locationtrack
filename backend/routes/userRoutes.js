import express from 'express';
import { registerUser, getUserLocation } from '../controllers/userController.js'; // Ensure the function is imported

const router = express.Router();

router.get('/', (req, res) => {
    res.send('✅ User API is working!');
});
router.post('/register', registerUser);

router.get('/location/:phone', getUserLocation);

export default router;
