import React from 'react';
import { MessageCircle, Heart, Share2, Plus } from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import '../styles/CommunityScreen.css';
import io from 'socket.io-client';

const CommunityScreen = ({ isDarkMode }) => {
    const [socket, setSocket] = React.useState(null);
    const [isConnected, setIsConnected] = React.useState(false);
    const [showCreate, setShowCreate] = React.useState(false);
    const [messages, setMessages] = React.useState([]);
    const [newPost, setNewPost] = React.useState('');
    const [isPosting, setIsPosting] = React.useState(false);

    React.useEffect(() => {
        // 1. Fetch initial messages history from MongoDB
        const fetchMessages = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/community/posts');
                const data = await res.json();
                const formattedMessages = data.map(msg => ({
                    ...msg,
                    isSelf: (msg.authorId || msg.userId) === 'anonymous-user',
                    user: msg.authorName || msg.user || 'शेतकरी मित्र',
                    timestamp: msg.createdAt || msg.timestamp,
                    content: msg.content || msg.message,
                    likes: 0,
                    comments: 0
                }));

                setMessages(prev => {
                    const existingIds = new Set(prev.map(m => m._id));
                    const newUnique = formattedMessages.filter(m => !existingIds.has(m._id));
                    const combined = [...newUnique, ...prev];
                    return combined.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
                });
            } catch (err) {
                console.error('Error fetching messages:', err);
            }
        };

        fetchMessages();

        // 2. Setup Socket.IO for real-time notifications
        const newSocket = io('http://localhost:5000');
        setSocket(newSocket);

        newSocket.on('connect', () => setIsConnected(true));
        newSocket.on('disconnect', () => setIsConnected(false));

        newSocket.emit('joinRoom', 'farmers-community');

        // 3. Listen for new messages from Socket.IO
        newSocket.on('receiveMessage', (data) => {
            setMessages((prev) => {
                // Check if message already exists (by _id or clientId) to avoid duplicates
                const exists = prev.find(m => m._id === data._id || (data.clientId && m.clientId === data.clientId));
                if (exists) {
                    // Update the optimistic message with real DB data
                    return prev.map(m => (data.clientId && m.clientId === data.clientId) ? {
                        ...m,
                        ...data,
                        user: data.authorName || data.user,
                        timestamp: data.createdAt || data.timestamp,
                        content: data.content || data.message,
                        isTemp: false
                    } : m);
                }

                return [...prev, {
                    ...data,
                    content: data.content || data.message,
                    user: data.authorName || data.user || 'शेतकरी मित्र',
                    location: data.location || 'गावाकडून',
                    en: data.en || 'Translated message...',
                    timestamp: data.createdAt || data.timestamp,
                    likes: 0,
                    comments: 0,
                    isSelf: (data.authorId || data.userId) === 'anonymous-user'
                }].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
            });
        });

        return () => {
            newSocket.disconnect();
        };
    }, []);

    const handlePost = async () => {
        if (!newPost.trim() || isPosting) return;

        const clientId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
        const postData = {
            content: newPost.trim(),
            authorId: 'anonymous-user',
            authorName: 'पाटील साहेब',
            location: 'पुणे',
            en: 'Auto-translated text will appear here...',
            clientId
        };

        setIsPosting(true);

        // Optimistic UI update
        const optimisticMsg = {
            ...postData,
            _id: clientId,
            user: postData.authorName,
            timestamp: new Date().toISOString(),
            likes: 0,
            comments: 0,
            isSelf: true,
            isTemp: true
        };
        setMessages(prev => [...prev, optimisticMsg]);

        try {
            // Save post to MongoDB via REST API
            const response = await fetch('http://localhost:5000/api/community/post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(postData)
            });

            if (response.ok) {
                setNewPost('');
                setShowCreate(false);
            } else {
                throw new Error('Failed to save post');
            }
        } catch (err) {
            console.error('Error posting:', err);
            // Rollback on failure
            setMessages(prev => prev.filter(m => m.clientId !== clientId));
            alert('पोस्ट करणे अयशस्वी झाले. कृपया पुन्हा प्रयत्न करा. / Failed to post. Please try again.');
        } finally {
            setIsPosting(false);
        }
    };

    return (
        <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="app-shell"
            style={{
                padding: '20px',
                width: '100%',
                margin: '0 auto'
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 className="marathi">समुदाय / Community</h2>
                <button
                    onClick={() => setShowCreate(!showCreate)}
                    style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}
                >
                    <Plus size={18} /> {showCreate ? 'बंद करा' : 'पोस्ट करा'}
                </button>
            </div>

            <AnimatePresence>
                {showCreate && (
                    <Motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        style={{ overflow: 'hidden', marginBottom: '20px' }}
                    >
                        <div style={{ background: isDarkMode ? '#1f2937' : 'white', padding: '20px', borderRadius: '20px', boxShadow: 'var(--shadow-subtle)', border: isDarkMode ? '1px solid #374151' : 'none' }}>
                            <textarea
                                value={newPost}
                                onChange={(e) => setNewPost(e.target.value)}
                                placeholder="तुमचे विचार सांगा... / Share your thoughts..."
                                style={{
                                    width: '100%',
                                    height: '100px',
                                    border: isDarkMode ? '1px solid #4b5563' : '1px solid #eee',
                                    borderRadius: '12px',
                                    padding: '12px',
                                    marginBottom: '12px',
                                    fontFamily: 'inherit',
                                    background: isDarkMode ? '#111827' : 'white',
                                    color: isDarkMode ? '#fff' : '#1f2937'
                                }}
                            />
                            <button
                                onClick={handlePost}
                                disabled={isPosting}
                                style={{
                                    width: '100%',
                                    background: isPosting ? '#9ca3af' : 'var(--primary)',
                                    color: 'white',
                                    border: 'none',
                                    padding: '12px',
                                    borderRadius: '12px',
                                    fontWeight: 700,
                                    cursor: isPosting ? 'not-allowed' : 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {isPosting ? 'पाठवत आहे...' : 'पोस्ट करा / Post'}
                            </button>
                        </div>
                    </Motion.div>
                )}
            </AnimatePresence>

            <div className="messages-container">
                {messages.map((post, i) => (
                    <Motion.div
                        key={post._id || i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`post-card ${post.isSelf ? 'self' : 'other'} ${post.isTemp ? 'optimistic' : ''}`}
                        style={{
                            background: post.isSelf ? (isDarkMode ? '#065f46' : '#ecfdf5') : (isDarkMode ? '#1f2937' : 'white'),
                            border: isDarkMode ? '1px solid #374151' : '1px solid #f5f5f5',
                            opacity: post.isTemp ? 0.7 : 1,
                            marginLeft: post.isSelf ? 'auto' : '0',
                            marginRight: post.isSelf ? '0' : 'auto',
                            maxWidth: '85%',
                            borderRadius: post.isSelf ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                            marginBottom: '16px',
                            padding: '20px'
                        }}
                    >
                        <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                            <div className="user-avatar" style={{ background: isDarkMode ? '#374151' : '#eee' }} />
                            <div>
                                <div style={{ fontWeight: 800, color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>{post.user}</div>
                                <div style={{ fontSize: '0.75rem', color: isDarkMode ? '#9ca3af' : 'var(--text-muted)' }}>
                                    {post.location} • {post.isTemp ? 'आत्ताच' : 'काही वेळापूर्वी'}
                                </div>
                            </div>
                        </div>

                        <p className="marathi" style={{ marginBottom: '4px', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>{post.content}</p>
                        <p className="english-sub" style={{ marginBottom: '16px', color: isDarkMode ? '#9ca3af' : '#6b7280' }}>{post.en}</p>

                        <div style={{ display: 'flex', gap: '20px', borderTop: isDarkMode ? '1px solid #374151' : '1px solid #f5f5f5', paddingTop: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: isDarkMode ? '#9ca3af' : 'var(--text-muted)', fontSize: '0.875rem' }}>
                                <Heart size={18} /> {post.likes || 0}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: isDarkMode ? '#9ca3af' : 'var(--text-muted)', fontSize: '0.875rem' }}>
                                <MessageCircle size={18} /> {post.comments || 0}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: isDarkMode ? '#9ca3af' : 'var(--text-muted)', fontSize: '0.875rem', marginLeft: 'auto' }}>
                                <Share2 size={18} />
                            </div>
                        </div>
                    </Motion.div>
                ))}
            </div>
        </Motion.div>
    );
};

export default CommunityScreen;
