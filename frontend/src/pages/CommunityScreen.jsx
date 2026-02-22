import React from 'react';
import { Plus } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import '../styles/CommunityScreen.css';
import io from 'socket.io-client';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

// ─── Backend-powered translation (no CORS — works in every browser) ─────────
// New posts come with `en` and `mr` already from the backend.
// For old posts without translations, we ask the backend to translate them.
// ─────────────────────────────────────────────────────────────────────────────

const CommunityScreen = ({ isDarkMode }) => {
    const { isEnglish } = useLanguage();
    const { user: currentUser } = useAuth();

    const [showCreate, setShowCreate] = React.useState(false);
    const [messages, setMessages] = React.useState([]);
    const [newPost, setNewPost] = React.useState('');
    const [isPosting, setIsPosting] = React.useState(false);

    // ── Socket.IO + initial fetch ───────────────────────────────────────────
    React.useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await fetch('/api/community/posts');
                const data = await res.json();
                const formatted = data.map(msg => ({
                    ...msg,
                    isSelf: (msg.authorId || msg.userId) === currentUser?.id,
                    user: msg.authorName || msg.user || 'शेतकरी मित्र',
                    timestamp: msg.createdAt || msg.timestamp,
                    content: msg.content || msg.message,
                }));
                setMessages(prev => {
                    const ids = new Set(prev.map(m => m._id));
                    const combined = [...formatted.filter(m => !ids.has(m._id)), ...prev];
                    return combined.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                });
            } catch (err) {
                console.error('Error fetching messages:', err);
            }
        };

        fetchMessages();

        const sock = io('/'); // proxied through Vite → backend
        sock.emit('joinRoom', 'farmers-community');

        const currentUserId = currentUser?.id;

        sock.on('receiveMessage', (data) => {
            setMessages(prev => {
                const exists = prev.find(
                    m => m._id === data._id || (data.clientId && m.clientId === data.clientId)
                );
                if (exists) {
                    return prev.map(m =>
                        (data.clientId && m.clientId === data.clientId) || m._id === data._id
                            ? {
                                ...m, ...data,
                                user: data.authorName || data.user,
                                timestamp: data.createdAt || data.timestamp,
                                content: data.content || data.message,
                                isTemp: false
                            }
                            : m
                    ).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                }
                return [...prev, {
                    ...data,
                    content: data.content || data.message,
                    user: data.authorName || data.user || 'शेतकरी मित्र',
                    location: data.location || 'गावाकडून',
                    timestamp: data.createdAt || data.timestamp,
                    isSelf: (data.authorId || data.userId) === currentUserId,
                }].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            });
        });

        return () => sock.disconnect();
    }, [currentUser?.id]);

    // ── Post handler ────────────────────────────────────────────────────────
    const handlePost = async () => {
        if (!newPost.trim() || isPosting) return;

        const clientId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
        const postData = {
            content: newPost.trim(),
            authorId: currentUser?.id || 'anonymous-user',
            authorName: currentUser?.name || 'पाटील साहेब',
            location: currentUser?.farmInfo?.location || 'पुणे',
            clientId,
        };

        setIsPosting(true);
        setMessages(prev => [{
            ...postData,
            _id: clientId,
            user: postData.authorName,
            timestamp: new Date().toISOString(),
            isSelf: true,
            isTemp: true,
        }, ...prev]);

        try {
            const res = await fetch('/api/community/post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(postData),
            });
            if (res.ok) {
                setNewPost('');
                setShowCreate(false);
            } else {
                throw new Error('Failed to save post');
            }
        } catch (err) {
            console.error('Error posting:', err);
            setMessages(prev => prev.filter(m => m.clientId !== clientId));
            alert('पोस्ट करणे अयशस्वी झाले. कृपया पुन्हा प्रयत्न करा.\nFailed to post. Please try again.');
        } finally {
            setIsPosting(false);
        }
    };

    // ── Render ──────────────────────────────────────────────────────────────
    return (
        <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="app-shell"
            style={{ padding: '20px', width: '100%', margin: '0 auto' }}
        >
            {/* ── Header ── */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px',
            }}>
                <h2 className="marathi" style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                    {isEnglish ? 'Farmers Community' : 'शेतकरी समुदाय'}
                </h2>
                <button
                    id="community-post-toggle"
                    onClick={() => setShowCreate(v => !v)}
                    style={{
                        background: 'var(--primary)',
                        color: 'white',
                        border: 'none',
                        padding: '10px 16px',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        zIndex: 10,
                        position: 'relative',
                    }}
                >
                    <Plus size={18} />
                    {isEnglish ? (showCreate ? 'Close' : 'Create Post') : (showCreate ? 'बंद करा' : 'पोस्ट करा')}
                </button>
            </div>

            {/* ── Compose box ── */}
            <div style={{
                maxHeight: showCreate ? '300px' : '0px',
                overflow: 'hidden',
                transition: 'max-height 0.35s ease, opacity 0.25s ease',
                opacity: showCreate ? '1' : 0,
                marginBottom: showCreate ? '20px' : '0',
                ...(showCreate ? { overflow: 'visible' } : {}),
            }}>
                <div style={{
                    background: isDarkMode ? '#1f2937' : 'white',
                    padding: '20px',
                    borderRadius: '20px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    border: isDarkMode ? '1px solid #374151' : '1px solid #e5e7eb',
                    pointerEvents: showCreate ? 'auto' : 'none',
                }}>
                    <textarea
                        id="community-post-textarea"
                        value={newPost}
                        onChange={e => setNewPost(e.target.value)}
                        placeholder={isEnglish ? "Share your thoughts with other farmers..." : "इतर शेतकऱ्यांशी तुमचे विचार शेअर करा..."}
                        style={{
                            display: 'block',
                            width: '100%',
                            height: '100px',
                            padding: '12px',
                            marginBottom: '12px',
                            fontFamily: 'inherit',
                            fontSize: '0.95rem',
                            border: isDarkMode ? '1px solid #4b5563' : '1px solid #e5e7eb',
                            borderRadius: '12px',
                            background: isDarkMode ? '#111827' : '#f9fafb',
                            color: isDarkMode ? '#fff' : '#1f2937',
                            resize: 'none',
                            boxSizing: 'border-box',
                            outline: 'none',
                            pointerEvents: 'auto',
                            zIndex: 20,
                            position: 'relative',
                        }}
                    />
                    <button
                        id="community-post-submit"
                        onClick={handlePost}
                        disabled={isPosting}
                        style={{
                            display: 'block',
                            width: '100%',
                            background: isPosting ? '#9ca3af' : 'var(--primary)',
                            color: 'white',
                            border: 'none',
                            padding: '12px',
                            borderRadius: '12px',
                            fontWeight: 700,
                            fontSize: '0.95rem',
                            cursor: isPosting ? 'not-allowed' : 'pointer',
                            transition: 'background 0.3s ease',
                            pointerEvents: 'auto',
                            zIndex: 20,
                            position: 'relative',
                        }}
                    >
                        {isPosting
                            ? (isEnglish ? 'Posting...' : 'पोस्ट करत आहे...')
                            : (isEnglish ? 'Post Now' : 'आताच पोस्ट करा')}
                    </button>
                </div>
            </div>

            {/* ── Feed ── */}
            <div className="messages-container">
                {messages.map((post, i) => {
                    return (
                        <Motion.div
                            key={post._id || i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`post-card ${post.isSelf ? 'self' : 'other'} ${post.isTemp ? 'optimistic' : ''}`}
                            style={{
                                background: post.isSelf
                                    ? (isDarkMode ? '#065f46' : '#ecfdf5')
                                    : (isDarkMode ? '#1f2937' : 'white'),
                                border: isDarkMode ? '1px solid #374151' : '1px solid #f0f0f0',
                                opacity: post.isTemp ? 0.7 : 1,
                                marginLeft: post.isSelf ? 'auto' : '0',
                                marginRight: post.isSelf ? '0' : 'auto',
                                maxWidth: '85%',
                                borderRadius: post.isSelf
                                    ? '20px 20px 4px 20px'
                                    : '20px 20px 20px 4px',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                                marginBottom: '16px',
                                padding: '20px',
                            }}
                        >
                            {/* Author row */}
                            <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                                <div className="user-avatar"
                                    style={{ background: isDarkMode ? '#374151' : '#e5e7eb', flexShrink: 0 }} />
                                <div>
                                    <div style={{ fontWeight: 800, color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>
                                        {post.user}
                                    </div>
                                    <div style={{ fontSize: '0.72rem', color: isDarkMode ? '#9ca3af' : 'var(--text-muted)', marginTop: '2px' }}>
                                        {post.location} • {post.isTemp ? 'आत्ताच' : 'काही वेळापूर्वी'}
                                    </div>
                                </div>
                            </div>

                            {/* Original content — always visible */}
                            <div>
                                <p
                                    className="marathi"
                                    style={{
                                        color: isDarkMode ? '#f3f4f6' : '#1f2937',
                                        lineHeight: 1.65,
                                        fontSize: '0.95rem',
                                        margin: 0,
                                    }}
                                >
                                    {post.content}
                                </p>
                            </div>
                        </Motion.div>
                    );
                })}
            </div>
        </Motion.div>
    );
};

export default CommunityScreen;
