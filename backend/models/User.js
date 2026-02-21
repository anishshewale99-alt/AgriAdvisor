const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    picture: {
        type: String
    },
    farmInfo: {
        farmName: String,
        location: String,
        farmSize: Number,
        farmSizeUnit: {
            type: String,
            enum: ['acres', 'hectares'],
            default: 'acres'
        },
        mainCrops: [String],
        soilType: String
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    isOnboarded: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
