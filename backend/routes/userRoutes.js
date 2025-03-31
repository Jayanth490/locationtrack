import express from 'express';
import { registerUser } from '../controllers/userController.js'; // Ensure .js extension is included

const router = express.Router();

router.get('/', (req, res) => {
    res.send('✅ User API is working!');
});

// Ensure POST method is used for registration
router.post('/register', registerUser);
export default router;
