import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { LogIn, Phone, Rocket, Languages, Volume2, ArrowRight } from 'lucide-react';
import FarmPattern from '../assets/image.png';
import LandingImg from '../assets/landing img.jpg';
import '../styles/LandingScreen.css';

const LandingScreen = ({ onNext, isDesktop }) => {
    const [view, setView] = useState('intro'); // intro, login
    const [isEnglish, setIsEnglish] = useState(false);

    if (view === 'intro') {
        return (
            <div style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url(${LandingImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                padding: isDesktop ? '0 100px' : '0 40px',
                position: 'relative'
            }}>

                {/* Main Content */}
                <Motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ maxWidth: '600px' }}
                >
                    <h1 style={{
                        color: 'white',
                        fontSize: isDesktop ? '4.5rem' : '3rem',
                        fontWeight: 800,
                        lineHeight: 1.1,
                        marginBottom: '20px',
                        textShadow: '0 4px 20px rgba(0,0,0,0.3)'
                    }}>
                        Your harvest begins with the right decision.<br />
                        <span style={{ color: '#ffc107c9' }}></span>
                    </h1>

                    <p style={{
                        color: 'rgba(255,255,255,0.9)',
                        fontSize: '1.25rem',
                        marginBottom: '40px',
                        fontWeight: 500,
                        maxWidth: '450px'
                    }}>
                        Experience the true taste of farm-fresh rice.
                    </p>

                    <button
                        onClick={() => setView('login')}
                        style={{
                            background: '#FFC107',
                            color: '#1a232e',
                            border: '4px solid white',
                            padding: '16px 48px',
                            fontSize: '1.5rem',
                            fontWeight: 800,
                            borderRadius: '4px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    >
                        Proceed
                    </button>
                </Motion.div>
            </div>
        );
    }

    return (
        <div style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${FarmPattern})`,
            backgroundRepeat: 'repeat',
            backgroundSize: '400px',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            padding: '20px',
            overflow: 'hidden'
        }}>
            <Motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="glass-overlay"
                style={{ width: '100%', maxWidth: '420px', textAlign: 'center' }}
            >
                <div className="logo-circle">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/3014/3014388.png"
                        alt="Logo"
                        style={{ width: '45px' }}
                    />
                </div>

                <h1 className="marathi" style={{ fontSize: '1.75rem', marginBottom: '8px' }}>
                    {isEnglish ? 'Login to CropAdvisor' : 'CropAdvisor मध्ये लॉगिन करा'}
                </h1>
                <p className="english-sub" style={{ fontSize: '1rem', marginBottom: '32px' }}>
                    {isEnglish ? 'Sign in to continue' : 'पुढे जाण्यासाठी साइन इन करा'}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <button className="cta-btn" style={{ background: 'white', color: 'var(--text-main)', border: '1px solid #eee', margin: 0, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                        <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" style={{ width: '20px' }} />
                        {isEnglish ? 'Sign in with Google' : 'Google ने लॉगिन करा'}
                    </button>

                    <button className="cta-btn" style={{ margin: 0, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                        <Phone size={20} />
                        {isEnglish ? 'Connect with Phone' : 'फोन नंबर वापरा'}
                    </button>

                    <div style={{ margin: '12px 0', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                        {isEnglish ? 'or' : 'किंवा'}
                    </div>

                    <div style={{ position: 'relative' }}>
                        <input
                            type="text"
                            placeholder={isEnglish ? 'Email Address' : 'ईमेल पत्ता'}
                            style={{ width: '100%', padding: '16px', borderRadius: '12px', border: 'none', background: 'var(--bg-field)', marginBottom: '12px' }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button
                            onClick={() => setView('intro')}
                            className="cta-btn"
                            style={{ flex: 1, margin: 0, background: 'rgba(0,0,0,0.05)', color: 'var(--text-main)' }}
                        >
                            Back
                        </button>
                        <button
                            onClick={onNext}
                            className="cta-btn yellow"
                            style={{ flex: 2, margin: 0, fontSize: '1.1rem' }}
                        >
                            {isEnglish ? 'Start as Guest' : 'Guest Mode'}
                        </button>
                    </div>
                </div>
            </Motion.div>
        </div>
    );
};

export default LandingScreen;
