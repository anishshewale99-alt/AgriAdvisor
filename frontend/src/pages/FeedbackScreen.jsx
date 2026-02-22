import React, { useState } from 'react';
import { MessageSquare, Star, TrendingUp, TrendingDown, Send, CheckCircle2 } from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { cropData } from '../cropData';
import { useAuth } from '../context/AuthContext';
import TTSButton from '../components/TTSButton';

const FeedbackScreen = ({ isDarkMode, isEnglish }) => {
    const { user } = useAuth();
    const [cropName, setCropName] = useState('');
    const [outcome, setOutcome] = useState('Profit');
    const [amount, setAmount] = useState('');
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState(5);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!cropName || !feedback) return;

        setIsSubmitting(true);
        try {
            const API_URL = import.meta.env.VITE_API_URL || '';
            const response = await fetch(`${API_URL}/api/feedback`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    cropName,
                    outcome,
                    amount: amount ? Number(amount) : 0,
                    feedback,
                    rating
                })
            });

            if (response.ok) {
                setSubmitted(true);
                setTimeout(() => {
                    setSubmitted(false);
                    setCropName('');
                    setFeedback('');
                    setAmount('');
                    setRating(5);
                }, 3000);
            }
        } catch (err) {
            console.error('Feedback error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const isEn = isEnglish;

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px'
            }}>
                <h2 className="marathi" style={{ fontSize: '1.5rem', fontWeight: 800 }}>
                    {isEn ? 'Share Your Success' : 'तुमचे यश शेअर करा'}
                </h2>
                <TTSButton
                    textToRead={isEn ? "Please share your feedback about the crops you grew." : "तुम्ही घेतलेल्या पिकांबद्दल तुमचा अभिप्राय शेअर करा."}
                    isDarkMode={isDarkMode}
                />
            </div>

            <Motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    background: isDarkMode ? '#1f2937' : 'white',
                    padding: '24px',
                    borderRadius: '24px',
                    boxShadow: isDarkMode ? '0 10px 30px rgba(0,0,0,0.3)' : '0 10px 30px rgba(0,0,0,0.05)',
                    border: isDarkMode ? '1px solid #374151' : '1px solid #f0f0f0'
                }}
            >
                {submitted ? (
                    <Motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        style={{ textAlign: 'center', padding: '40px 0' }}
                    >
                        <CheckCircle2 size={60} color="#16a34a" style={{ margin: '0 auto 20px' }} />
                        <h3 className="marathi" style={{ fontSize: '1.25rem', color: '#16a34a' }}>
                            {isEn ? 'Thank you for your feedback!' : 'तुमच्या अभिप्रायाबद्दल धन्यवाद!'}
                        </h3>
                        <p style={{ marginTop: '10px', color: isDarkMode ? '#9ca3af' : '#6b7280' }}>
                            {isEn ? 'Your experience helps other farmers make better decisions.' : 'तुमचा अनुभव इतर शेतकऱ्यांना चांगले निर्णय घेण्यास मदत करतो.'}
                        </p>
                    </Motion.div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        {/* Crop Selection */}
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '0.9rem' }}>
                                {isEn ? 'Which crop did you grow?' : 'तुम्ही कोणते पीक घेतले?'}
                            </label>
                            <select
                                value={cropName}
                                onChange={(e) => setCropName(e.target.value)}
                                required
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '12px',
                                    border: isDarkMode ? '1px solid #4b5563' : '1px solid #e5e7eb',
                                    background: isDarkMode ? '#374151' : '#f9fafb',
                                    color: isDarkMode ? 'white' : 'inherit',
                                    outline: 'none'
                                }}
                            >
                                <option value="">{isEn ? 'Select Crop' : 'पीक निवडा'}</option>
                                {cropData.map(c => (
                                    <option key={c.id} value={c.englishName}>
                                        {isEn ? c.englishName : c.marathiName}
                                    </option>
                                ))}
                                <option value="Other">{isEn ? 'Other' : 'इतर'}</option>
                            </select>
                        </div>

                        {/* Outcome Toggle */}
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '0.9rem' }}>
                                {isEn ? 'Outcome' : 'निकाल'}
                            </label>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                {['Profit', 'Loss'].map(opt => (
                                    <button
                                        key={opt}
                                        type="button"
                                        onClick={() => setOutcome(opt)}
                                        style={{
                                            flex: 1,
                                            padding: '12px',
                                            borderRadius: '12px',
                                            border: 'none',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px',
                                            fontWeight: 700,
                                            cursor: 'pointer',
                                            background: outcome === opt
                                                ? (opt === 'Profit' ? '#16a34a' : '#dc2626')
                                                : (isDarkMode ? '#374151' : '#f1f1f1'),
                                            color: outcome === opt ? 'white' : (isDarkMode ? '#9ca3af' : '#6b7280'),
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        {opt === 'Profit' ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                                        {isEn ? opt : (opt === 'Profit' ? 'नफा' : 'तोटा')}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Amount */}
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '0.9rem' }}>
                                {isEn ? `How much ${outcome.toLowerCase()} did you make? (Optional)` : `तुम्हाला किती ${outcome === 'Profit' ? 'नफा' : 'तोटा'} झाला? (पर्यायी)`}
                            </label>
                            <div style={{ position: 'relative' }}>
                                <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontWeight: 700 }}>₹</span>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="0.00"
                                    style={{
                                        width: '100%',
                                        padding: '12px 12px 12px 30px',
                                        borderRadius: '12px',
                                        border: isDarkMode ? '1px solid #4b5563' : '1px solid #e5e7eb',
                                        background: isDarkMode ? '#374151' : '#f9fafb',
                                        color: isDarkMode ? 'white' : 'inherit',
                                        outline: 'none'
                                    }}
                                />
                            </div>
                        </div>

                        {/* Rating */}
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '0.9rem' }}>
                                {isEn ? 'How satisfied are you with the suggestion?' : 'तुम्ही या शिफारशीने किती समाधानी आहात?'}
                            </label>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                {[1, 2, 3, 4, 5].map(star => (
                                    <Star
                                        key={star}
                                        size={32}
                                        onClick={() => setRating(star)}
                                        fill={star <= rating ? '#fbbf24' : 'none'}
                                        color={star <= rating ? '#fbbf24' : '#d1d5db'}
                                        style={{ cursor: 'pointer' }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Detail Feedback */}
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '0.9rem' }}>
                                {isEn ? 'Share more details' : 'अधिक माहिती शेअर करा'}
                            </label>
                            <textarea
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                required
                                rows={4}
                                placeholder={isEn ? "Tell us about your experience..." : "तुमच्या अनुभवाबद्दल सांगा..."}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '12px',
                                    border: isDarkMode ? '1px solid #4b5563' : '1px solid #e5e7eb',
                                    background: isDarkMode ? '#374151' : '#f9fafb',
                                    color: isDarkMode ? 'white' : 'inherit',
                                    outline: 'none',
                                    resize: 'none'
                                }}
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            style={{
                                width: '100%',
                                padding: '16px',
                                borderRadius: '16px',
                                background: 'var(--primary)',
                                color: 'white',
                                border: 'none',
                                fontWeight: 800,
                                fontSize: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px',
                                cursor: isSubmitting ? 'default' : 'pointer',
                                opacity: isSubmitting ? 0.7 : 1,
                                boxShadow: '0 4px 12px rgba(22, 163, 74, 0.2)'
                            }}
                        >
                            {isSubmitting ? (isEn ? 'Submitting...' : 'पाठवत आहे...') : (isEn ? 'Send Feedback' : 'अभिप्राय पाठवा')}
                            <Send size={20} />
                        </button>
                    </form>
                )}
            </Motion.div>
        </div>
    );
};

export default FeedbackScreen;
