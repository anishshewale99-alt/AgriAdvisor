require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Basic Route
app.get('/', (req, res) => {
    res.send('AgriAdvisor API is running...');
});

// Routes
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const cropRoutes = require('./routes/crops');
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/crops', cropRoutes);

// Database Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/agriadvisor';
mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
