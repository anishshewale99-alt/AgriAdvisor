const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    user: { type: String, required: true },
    location: { type: String, required: true },
    content: { type: String, required: true },
    en: { type: String },
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', PostSchema);
