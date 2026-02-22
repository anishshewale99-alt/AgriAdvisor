/**
 * Seed a universal test user for AgriAdvisor.
 * 
 * Login credentials:
 *   Email:    farmer@agri.com
 *   Password: 123456
 *
 * Run:  node scripts/seedTestUser.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

if (!MONGO_URI) {
    console.error('❌ MONGO_URI not found in .env');
    process.exit(1);
}

// Define inline schema (same as models/User.js) to avoid import issues
const userSchema = new mongoose.Schema({
    googleId: { type: String, unique: true, sparse: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    name: { type: String, required: true },
    picture: { type: String },
    farmInfo: {
        farmName: String,
        location: String,
        farmSize: Number,
        farmSizeUnit: { type: String, enum: ['acres', 'hectares', 'guntha'], default: 'acres' },
        mainCrops: [String],
        soilType: String,
        irrigation: Boolean,
        plantingSeason: String
    },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    isOnboarded: { type: Boolean, default: false }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

async function seed() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB');

        const TEST_EMAIL = 'farmer@agri.com';
        const TEST_PASSWORD = '123456';
        const TEST_NAME = 'शेतकरी मित्र';

        // Check if test user already exists
        let user = await User.findOne({ email: TEST_EMAIL });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(TEST_PASSWORD, salt);

        if (user) {
            // Update existing test user's password (in case it was corrupted)
            user.password = hashedPassword;
            user.name = TEST_NAME;
            await user.save();
            console.log('✅ Test user password reset successfully!');
        } else {
            // Create new test user
            user = new User({
                email: TEST_EMAIL,
                password: hashedPassword,
                name: TEST_NAME,
                role: 'user',
                isOnboarded: false
            });
            await user.save();
            console.log('✅ Test user created successfully!');
        }

        console.log('');
        console.log('🔑 Universal Login Credentials:');
        console.log('   Email:    farmer@agri.com');
        console.log('   Password: 123456');
        console.log('');

        await mongoose.disconnect();
        process.exit(0);
    } catch (err) {
        console.error('❌ Error seeding test user:', err.message);
        process.exit(1);
    }
}

seed();
