const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    cropName: {
        type: String,
        required: true
    },
    outcome: {
        type: String,
        enum: ['Profit', 'Loss', 'Neutral'],
        required: true
    },
    amount: {
        type: Number
    },
    feedback: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
