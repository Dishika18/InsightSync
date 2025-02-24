import express from 'express';

const router = express.Router();

router.post('/submit', (req, res) => {
    // Handle feedback submission logic here
    res.status(200).json({ message: 'Feedback submitted successfully' });
});

export default router;