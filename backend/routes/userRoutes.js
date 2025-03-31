import express from 'express';
import { registerUser, getLocationByPhoneNumber } from '../controllers/userController.js';

const router = express.Router();
router.get('/', (req, res) => {
    res.send('✅ User API is working!');
});
router.post('/register', registerUser);
router.get('/location/:phoneNumber', getLocationByPhoneNumber);

export default router;
