const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');

// Validation helper
const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

// Google OAuth Login/Signup
router.post('/google', async (req, res) => {
    try {
        const { googleId, email, name, picture } = req.body;

        if (!googleId || !email || !name) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Check if user exists
        let user = await User.findOne({ email });

        if (!user) {
            // Create new user
            user = new User({
                googleId,
                email,
                name,
                picture,
                role: 'user',
                isOnboarded: false
            });
            await user.save();
        } else {
            // Update existing user's Google info if needed
            if (!user.googleId) {
                user.googleId = googleId;
            }
            if (picture && picture !== user.picture) {
                user.picture = picture;
            }
            await user.save();
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                picture: user.picture,
                role: user.role,
                isOnboarded: user.isOnboarded,
                farmInfo: user.farmInfo
            }
        });
    } catch (error) {
        console.error('Google auth error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Standard Email/Password Signup
router.post('/signup', async (req, res) => {
    console.log('📝 Signup attempt:', req.body.email);
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            console.warn('⚠️ Signup failed: Missing fields');
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (!validateEmail(email)) {
            console.warn('⚠️ Signup failed: Invalid email', email);
            return res.status(400).json({ message: 'Invalid email format' });
        }

        if (password.length < 6) {
            console.warn('⚠️ Signup failed: Password too short');
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.warn('⚠️ Signup failed: Email already exists', email);
            return res.status(400).json({ message: 'Email already registered' });
        }

        const user = new User({
            name,
            email,
            password,
            isOnboarded: false
        });

        await user.save();
        console.log('✅ User created successfully:', email);

        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role,
                isOnboarded: user.isOnboarded
            }
        });
    } catch (error) {
        console.error('❌ Signup error:', error);
        res.status(500).json({ message: 'Signup failed', error: error.message });
    }
});

// Standard Email/Password Login
router.post('/login', async (req, res) => {
    console.log('🔑 Login attempt:', req.body.email);
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            console.warn('⚠️ Login failed: User not found', email);
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            console.warn('⚠️ Login failed: Incorrect password for', email);
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        console.log('✅ Login successful:', email);
        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                picture: user.picture,
                role: user.role,
                isOnboarded: user.isOnboarded,
                farmInfo: user.farmInfo
            }
        });
    } catch (error) {
        console.error('❌ Login error:', error);
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
});

// Get current user profile
router.get('/me', authenticateToken, async (req, res) => {
    try {
        res.json({
            user: {
                id: req.user._id,
                email: req.user.email,
                name: req.user.name,
                picture: req.user.picture,
                role: req.user.role,
                isOnboarded: req.user.isOnboarded,
                farmInfo: req.user.farmInfo
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Update user farm information (onboarding)
router.put('/farm-info', authenticateToken, async (req, res) => {
    try {
        const { farmName, location, farmSize, farmSizeUnit, mainCrops, soilType, irrigation, plantingSeason } = req.body;

        const farmData = {
            farmName: farmName || req.user.farmInfo?.farmName,
            location: location || req.user.farmInfo?.location,
            farmSize: farmSize !== undefined ? farmSize : req.user.farmInfo?.farmSize,
            farmSizeUnit: farmSizeUnit || req.user.farmInfo?.farmSizeUnit,
            mainCrops: mainCrops || req.user.farmInfo?.mainCrops,
            soilType: soilType || req.user.farmInfo?.soilType,
            irrigation: irrigation !== undefined ? irrigation : req.user.farmInfo?.irrigation,
            plantingSeason: plantingSeason || req.user.farmInfo?.plantingSeason
        };

        req.user.farmInfo = farmData;
        req.user.isOnboarded = true;
        await req.user.save();

        res.json({
            message: 'Farm information updated successfully',
            user: {
                id: req.user._id,
                email: req.user.email,
                name: req.user.name,
                picture: req.user.picture,
                role: req.user.role,
                isOnboarded: req.user.isOnboarded,
                farmInfo: req.user.farmInfo
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Logout (client-side will remove token)
router.post('/logout', authenticateToken, (req, res) => {
    res.json({ message: 'Logged out successfully' });
});

module.exports = router;
