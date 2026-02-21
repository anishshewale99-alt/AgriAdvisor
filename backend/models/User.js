const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
    password: {
        type: String,
        required: function () {
            return !this.googleId; // Password required if not Google login
        }
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
            enum: ['acres', 'hectares', 'guntha'],
            default: 'acres'
        },
        mainCrops: [String],
        soilType: String,
        irrigation: Boolean,
        plantingSeason: String
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

// Hash password before saving
userSchema.pre('save', async function () {
    if (!this.isModified('password') || !this.password) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
    if (!this.password) return false;
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
