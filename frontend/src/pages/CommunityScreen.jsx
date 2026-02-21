import React from 'react';
import { Plus, MessageCircle, Heart, Share2 } from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import '../styles/CommunityScreen.css';
import io from 'socket.io-client';
import { useLanguage } from '../context/LanguageContext';

// ─── MyMemory free translation API (no key, CORS-safe) ───────────────────────
async function translateText(text, toLang) {
    if (!text?.trim()) return '';
    try {
        // Use 'auto' to let MyMemory detect the source language
        const res = await fetch(
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text.slice(0, 450))}&langpair=auto|${toLang}`
        );
        if (!res.ok) return '';
        const json = await res.json();
        return json.responseStatus === 200 ? json.responseData.translatedText : '';
    } catch {
        return ''; // Silently fail — original always visible
    }
}
// ─────────────────────────────────────────────────────────────────────────────

const CommunityScreen = ({ isDarkMode }) => {
    const { isEnglish } = useLanguage();

    const [showCreate, setShowCreate] = React.useState(false);
    const [messages, setMessages] = React.useState([]);
    const [newPost, setNewPost] = React.useState('');
    const [isPosting, setIsPosting] = React.useState(false);

    // Cache both directions so a language switch is instant
    // shape: { [postId]: { en: string|null, mr: string|null } }
    const [translations, setTranslations] = React.useState({});
    const processedRef = React.useRef(new Set()); // cacheKey → in-flight or done

    // ── Queue translation both ways for a post ──────────────────────────────
    const queueTranslation = React.useCallback((postId, content) => {
        if (!postId || !content?.trim()) return;

        // Translate to English
        const enKey = `${postId}_en`;
        if (!processedRef.current.has(enKey)) {
            processedRef.current.add(enKey);
            setTranslations(prev => ({
                ...prev,
                [postId]: { ...(prev[postId] || {}), enLoading: true }
            }));
            translateText(content, 'en').then(result => {
                const isDifferent = result && result.trim().toLowerCase() !== content.trim().toLowerCase();
                setTranslations(prev => ({
                    ...prev,
                    [postId]: { ...(prev[postId] || {}), en: isDifferent ? result : null, enLoading: false }
                }));
            });
        }

        // Translate to Marathi (for posts that may be in English)
        const mrKey = `${postId}_mr`;
        if (!processedRef.current.has(mrKey)) {
            processedRef.current.add(mrKey);
            setTranslations(prev => ({
                ...prev,
                [postId]: { ...(prev[postId] || {}), mrLoading: true }
            }));
            translateText(content, 'mr').then(result => {
                const isDifferent = result && result.trim().toLowerCase() !== content.trim().toLowerCase();
                setTranslations(prev => ({
                    ...prev,
                    [postId]: { ...(prev[postId] || {}), mr: isDifferent ? result : null, mrLoading: false }
                }));
            });
        }
    }, []);

    // Translate all posts (new or existing) eagerly — both languages cached up-front
    React.useEffect(() => {
        messages.forEach(post => {
            if (post._id) queueTranslation(post._id, post.content);
        });
    }, [messages, queueTranslation]);

    // ── Socket.IO + initial fetch ───────────────────────────────────────────
    React.useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await fetch('/api/community/posts');
                const data = await res.json();
                const formatted = data.map(msg => ({
                    ...msg,
                    isSelf: (msg.authorId || msg.userId) === 'anonymous-user',
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
                    isSelf: (data.authorId || data.userId) === 'anonymous-user',
                }].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            });
        });

        return () => sock.disconnect();
    }, []);

    // ── Post handler ────────────────────────────────────────────────────────
    const handlePost = async () => {
        if (!newPost.trim() || isPosting) return;

        const clientId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
        const postData = {
            content: newPost.trim(),
            authorId: 'anonymous-user',
            authorName: 'पाटील साहेब',
            location: 'पुणे',
            en: '',
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

    // ── Helpers ─────────────────────────────────────────────────────────────
    const getTranslation = (postId) => {
        const t = translations[postId];
        if (!t) return null;
        const current = isEnglish ? { text: t.en, loading: !!t.enLoading } : { text: t.mr, loading: !!t.mrLoading };
        if (!current.text && !current.loading) return null;
        return current;
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
                <h2 className="marathi">समुदाय / Community</h2>
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
                    {showCreate ? 'बंद करा' : 'पोस्ट करा'}
                </button>
            </div>

            {/* ── Compose box ──
                FIX: use a plain div with CSS transition instead of Framer
                height animation — avoids overflow: hidden blocking pointer events
            ── */}
            <div style={{
                maxHeight: showCreate ? '300px' : '0px',
                overflow: 'hidden',
                transition: 'max-height 0.35s ease, opacity 0.25s ease',
                opacity: showCreate ? 1 : 0,
                marginBottom: showCreate ? '20px' : '0',
                // Ensure the open state never clips content
                ...(showCreate ? { overflow: 'visible' } : {}),
            }}>
                <div style={{
                    background: isDarkMode ? '#1f2937' : 'white',
                    padding: '20px',
                    borderRadius: '20px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    border: isDarkMode ? '1px solid #374151' : '1px solid #e5e7eb',
                    // ensure pointer events work
                    pointerEvents: showCreate ? 'auto' : 'none',
                }}>
                    <textarea
                        id="community-post-textarea"
                        value={newPost}
                        onChange={e => setNewPost(e.target.value)}
                        placeholder="तुमचे विचार सांगा... / Share your thoughts..."
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
                            // guarantee interactivity
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
                        {isPosting ? 'पाठवत आहे...' : 'पोस्ट करा / Post'}
                    </button>
                </div>
            </div>

            {/* ── Feed ── */}
            <div className="messages-container">
                {messages.map((post, i) => {
                    const translation = getTranslation(post._id);

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
                            <p
                                className="marathi"
                                style={{
                                    color: isDarkMode ? '#f3f4f6' : '#1f2937',
                                    lineHeight: 1.65,
                                    fontSize: '0.95rem',
                                    marginBottom: translation ? '10px' : '0',
                                }}
                            >
                                {post.content}
                            </p>

                            {/* Translation block — shows when translation is available (either direction) */}
                            {translation && (
                                <div style={{
                                    padding: '8px 12px',
                                    borderLeft: '3px solid var(--primary)',
                                    borderRadius: '0 8px 8px 0',
                                    background: isDarkMode
                                        ? 'rgba(255,255,255,0.04)'
                                        : 'rgba(46,125,50,0.05)',
                                }}>
                                    <span style={{
                                        display: 'block',
                                        fontSize: '0.6rem',
                                        fontWeight: 700,
                                        color: 'var(--primary)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.07em',
                                        marginBottom: '4px',
                                    }}>
                                        🌐 {isEnglish ? 'English' : 'मराठी'}
                                    </span>

                                    {translation.loading ? (
                                        <span style={{
                                            fontSize: '0.82rem',
                                            fontStyle: 'italic',
                                            color: isDarkMode ? '#6b7280' : '#9ca3af',
                                        }}>
                                            {isEnglish ? 'Translating…' : 'भाषांतर होत आहे…'}
                                        </span>
                                    ) : translation.text ? (
                                        <span style={{
                                            fontSize: '0.88rem',
                                            color: isDarkMode ? '#d1d5db' : '#4b5563',
                                            lineHeight: 1.55,
                                        }}>
                                            {translation.text}
                                        </span>
                                    ) : (
                                        // Translation returned empty (same language or short text)
                                        <span style={{
                                            fontSize: '0.82rem',
                                            fontStyle: 'italic',
                                            color: isDarkMode ? '#6b7280' : '#9ca3af',
                                        }}>
                                            {isEnglish ? 'Translation unavailable' : 'भाषांतर उपलब्ध नाही'}
                                        </span>
                                    )}
                                </div>
                            )}

                            {/* Like / Comment / Share / Translate */}
                            <div style={{
                                display: 'flex',
                                gap: '20px',
                                marginTop: '16px',
                                borderTop: isDarkMode ? '1px solid #374151' : '1px solid #f0f0f0',
                                paddingTop: '12px',
                                pointerEvents: 'auto'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: isDarkMode ? '#9ca3af' : 'var(--text-muted)', fontSize: '0.875rem', cursor: 'pointer' }}>
                                    <Heart size={18} /> {post.likes || 0}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: isDarkMode ? '#9ca3af' : 'var(--text-muted)', fontSize: '0.875rem', cursor: 'pointer' }}>
                                    <MessageCircle size={18} /> {post.comments || 0}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: isDarkMode ? '#9ca3af' : 'var(--text-muted)', fontSize: '0.875rem', cursor: 'pointer', marginLeft: 'auto' }}>
                                    <Share2 size={18} />
                                </div>
                            </div>
                        </Motion.div>
                    );
                })}
            </div>
        </Motion.div>
    );
};

export default CommunityScreen;
