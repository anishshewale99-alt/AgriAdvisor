require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

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

// Models
const CommunityPost = require('./models/CommunityPost');

// Routes
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const cropRoutes = require('./routes/crops');
const ttsRoutes = require('./routes/tts');
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/crops', cropRoutes);
app.use('/api/tts', ttsRoutes);

// Fetch all community posts
app.get('/api/community/posts', async (req, res) => {
    try {
        const posts = await CommunityPost.find().sort({ createdAt: 1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

// Create a community post via REST API
app.post('/api/community/post', async (req, res) => {
    try {
        const { content, authorId, authorName, location, en, clientId } = req.body;

        if (!content || !authorId) {
            return res.status(400).json({ error: 'Missing required fields: content and authorId' });
        }

        const newPost = new CommunityPost({
            content,
            authorId,
            authorName: authorName || 'शेतकरी मित्र',
            location: location || 'गावाकडून',
            en: en || 'Auto-translated text will appear here...',
            clientId
        });

        await newPost.save();

        const broadcastData = {
            ...newPost.toObject(),
            user: newPost.authorName,
            timestamp: newPost.createdAt
        };

        // Emit via Socket.IO for real-time update
        io.emit('receiveMessage', broadcastData);

        return res.status(201).json(newPost);
    } catch (err) {
        console.error('Error creating post:', err);
        return res.status(500).json({ error: 'Database save failed: ' + err.message });
    }
});

// Socket.IO logic
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('joinRoom', (room) => {
        socket.join(room);
        console.log(`User ${socket.id} joined room: ${room}`);
    });

    socket.on('sendMessage', async (data, callback) => {
        const { room, message, userId, user, location, en, clientId } = data;

        try {
            const newPost = new CommunityPost({
                content: message,
                authorId: userId,
                authorName: user || 'शेतकरी मित्र',
                location: location || 'गावाकडून',
                en: en || 'Auto-translated text will appear here...',
                clientId
            });
            await newPost.save();

            const broadcastData = {
                ...newPost.toObject(),
                user: newPost.authorName,
                timestamp: newPost.createdAt
            };

            // Broadcast to all connected users
            io.to(room).emit('receiveMessage', broadcastData);

            if (callback) callback({ success: true, data: broadcastData });
        } catch (err) {
            console.error('Error saving post:', err);
            if (callback) callback({ success: false, error: err.message });
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Database Connection
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error('FATAL ERROR: MONGO_URI is not defined in .env');
    process.exit(1);
}

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB connected successfully'))
    .catch(err => {
        console.error('❌ MongoDB connection error:', err.message);
        console.warn('⚠️ Server will continue running without database connection.');
    });

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
