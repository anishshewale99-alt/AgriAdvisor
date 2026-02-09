import React from 'react';
import { Mic, X } from 'lucide-react';
import { motion } from 'framer-motion';

const VoiceModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="voice-modal"
        >
            <button
                onClick={onClose}
                style={{ position: 'absolute', top: 30, right: 30, background: 'rgba(255,255,255,0.2)', border: 'none', padding: '10px', borderRadius: '50%', color: 'white' }}
            >
                <X size={24} />
            </button>

            <div className="pulse-mic">
                <Mic size={48} color="var(--primary)" />
            </div>

            <h2 className="marathi" style={{ fontSize: '1.5rem', marginBottom: '10px' }}>मी ऐकत आहे...</h2>
            <p style={{ opacity: 0.8 }}>I am listening...</p>

            <p style={{ marginTop: '40px', fontSize: '0.875rem', maxWidth: '250px' }}>
                "आजचा गव्हाचा बाजार भाव काय आहे?" <br />
                <span style={{ opacity: 0.6 }}>"What is today's wheat price?"</span>
            </p>
        </motion.div>
    );
};

export default VoiceModal;
