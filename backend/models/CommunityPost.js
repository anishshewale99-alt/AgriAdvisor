const mongoose = require('mongoose');

const communityPostSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    authorName: {
        type: String,
        default: 'शेतकरी मित्र'
    },
    authorId: {
        type: String,
        required: true
    },
    location: {
        type: String,
        default: 'गावाकडून'
    },
    en: {
        type: String,
        default: 'Translated message...'
    },
    clientId: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('CommunityPost', communityPostSchema);
