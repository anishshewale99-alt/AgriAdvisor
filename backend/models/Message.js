const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: String,
        default: 'शेतकरी मित्र'
    },
    location: {
        type: String,
        default: 'गावाकडून'
    },
    userId: {
        type: String,
        required: true
    },
    en: {
        type: String,
        default: 'Translated message...'
    },
    clientId: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    isSelf: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Message', messageSchema);
