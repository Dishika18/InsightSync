import express from 'express';
import { registerUser, loginUser } from '../controller/authController.js';
const router = express.Router();

// Register Route
router.post('/signup', registerUser);

// Login Route
router.post('/login', loginUser);

export default router;