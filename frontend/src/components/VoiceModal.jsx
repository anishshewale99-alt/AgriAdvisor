import React from 'react';
import { Mic, X } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import '../styles/VoiceModal.css';

const VoiceModal = ({ isOpen, onClose }) => {
    const [status, setStatus] = React.useState('listening'); // listening, processing

    React.useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                setStatus('processing');
            }, 3000);
            return () => {
                clearTimeout(timer);
                setStatus('listening');
            };
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <Motion.div
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

            <div className="pulse-mic" style={{ animation: status === 'listening' ? 'pulse-ring 1.5s infinite' : 'none' }}>
                <Mic size={48} color="var(--primary)" />
            </div>

            <h2 className="marathi" style={{ fontSize: '1.5rem', marginBottom: '10px' }}>
                {status === 'listening' ? 'मी ऐकत आहे...' : 'प्रक्रिया करत आहे...'}
            </h2>
            <p style={{ opacity: 0.8 }}>
                {status === 'listening' ? 'I am listening...' : 'Processing your request...'}
            </p>

            {status === 'listening' && (
                <p style={{ marginTop: '40px', fontSize: '0.875rem', maxWidth: '250px' }}>
                    "आजचा गव्हाचा बाजार भाव काय आहे?" <br />
                    <span style={{ opacity: 0.6 }}>"What is today's wheat price?"</span>
                </p>
            )}
        </Motion.div>
    );
};

export default VoiceModal;
