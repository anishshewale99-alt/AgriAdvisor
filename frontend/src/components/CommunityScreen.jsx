import React from 'react';
import { MessageCircle, Heart, Share2, Plus } from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

const CommunityScreen = () => {
    const [showCreate, setShowCreate] = React.useState(false);
    const [posts, setPosts] = React.useState([
        {
            user: 'पाटील दादा / Patil Dada',
            location: 'सातारा',
            content: 'माझ्या द्राक्षाच्या बागेला नवीन विद्राव्य खत वापरले, रिझल्ट खूप छान आहे! कोणाला माहिती हवी असल्यास नक्की विचारा.',
            en: 'Used new soluble fertilizer for my vineyard, results are great! DM if you need info.',
            likes: 124,
            comments: 45
        },
        {
            user: 'राहुल शेतकरी / Rahul Farmer',
            location: 'नाशिक',
            content: 'उन्हाळी हंगामासाठी कोणते बी वापरणे फायद्याचे ठरेल? मार्गदर्शन करावे.',
            en: 'Which seeds are profitable for the summer season? Please guide.',
            likes: 85,
            comments: 32
        }
    ]);

    const [newPost, setNewPost] = React.useState('');

    const handlePost = () => {
        if (!newPost.trim()) return;
        const post = {
            user: 'पाटील साहेब',
            location: 'पुणे',
            content: newPost,
            en: 'Auto-translated text will appear here...',
            likes: 0,
            comments: 0
        };
        setPosts([post, ...posts]);
        setNewPost('');
        setShowCreate(false);
    };

    return (
        <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="app-shell"
            style={{ padding: '20px' }}
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
                        <div style={{ background: 'white', padding: '20px', borderRadius: '20px', boxShadow: 'var(--shadow-subtle)' }}>
                            <textarea
                                value={newPost}
                                onChange={(e) => setNewPost(e.target.value)}
                                placeholder="तुमचे विचार सांगा... / Share your thoughts..."
                                style={{ width: '100%', height: '100px', border: '1px solid #eee', borderRadius: '12px', padding: '12px', marginBottom: '12px', fontFamily: 'inherit' }}
                            />
                            <button
                                onClick={handlePost}
                                style={{ width: '100%', background: 'var(--primary)', color: 'white', border: 'none', padding: '12px', borderRadius: '12px', fontWeight: 700 }}
                            >
                                पोस्ट करा / Post
                            </button>
                        </div>
                    </Motion.div>
                )}
            </AnimatePresence>

            {posts.map((post, i) => (
                <div key={i} className="post-card">
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                        <div className="user-avatar" />
                        <div>
                            <div style={{ fontWeight: 800 }}>{post.user}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{post.location} • २ तासांपूर्वी</div>
                        </div>
                    </div>

                    <p className="marathi" style={{ marginBottom: '4px' }}>{post.content}</p>
                    <p className="english-sub" style={{ marginBottom: '16px' }}>{post.en}</p>

                    <div style={{ display: 'flex', gap: '20px', borderTop: '1px solid #f5f5f5', paddingTop: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                            <Heart size={18} /> {post.likes}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                            <MessageCircle size={18} /> {post.comments}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.875rem', marginLeft: 'auto' }}>
                            <Share2 size={18} />
                        </div>
                    </div>
                </div>
            ))}
        </Motion.div>
    );
};

export default CommunityScreen;
