const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const { authenticateToken } = require('../middleware/auth');

// Submit feedback
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { cropName, outcome, amount, feedback, rating } = req.body;

        if (!cropName || !outcome || !feedback) {
            return res.status(400).json({ message: 'Please fill all required fields' });
        }

        const newFeedback = new Feedback({
            userId: req.user._id,
            userName: req.user.name,
            cropName,
            outcome,
            amount,
            feedback,
            rating
        });

        await newFeedback.save();
        res.status(201).json({ success: true, message: 'Feedback submitted successfully' });
    } catch (err) {
        console.error('Feedback error:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Get user's feedback history
router.get('/my-feedback', authenticateToken, async (req, res) => {
    try {
        const history = await Feedback.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.json(history);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching history' });
    }
});

module.exports = router;
