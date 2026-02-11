import React from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { LogIn, Phone, Rocket, Languages, Volume2 } from 'lucide-react';
import FarmPattern from '../assets/image.png';

const LandingScreen = ({ onNext }) => {
    const [isEnglish, setIsEnglish] = React.useState(false);

    return (
        <div style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url(${FarmPattern})`,
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
            <div className="top-bar" style={{ background: 'transparent', position: 'absolute', top: 0, left: 0, width: '100%' }}>
                <div style={{ flex: 1 }} />
                <div className="right">
                    <div
                        className="lang-toggle"
                        onClick={() => setIsEnglish(!isEnglish)}
                    >
                        <Motion.div
                            className="toggle-slide"
                            animate={{ left: isEnglish ? '50%' : '2px' }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                        <span className={!isEnglish ? 'active' : ''}>MR</span>
                        <span className={isEnglish ? 'active' : ''}>EN</span>
                    </div>
                    <Motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => { }}
                        className="speaker-fab"
                    >
                        <Volume2 size={32} color="var(--primary)" />
                    </Motion.button>
                </div>
            </div>

            <Motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="glass-overlay"
                style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}
            >
                <div className="logo-circle">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/2329/2329115.png"
                        alt="Logo"
                        style={{ width: '50px' }}
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

                    <button
                        onClick={onNext}
                        className="cta-btn yellow"
                        style={{ margin: 0, width: '100%', fontSize: '1.1rem', padding: '20px' }}
                    >
                        {isEnglish ? 'Start as Guest' : 'Guest Mode – सुरु करा'}
                    </button>
                </div>
            </Motion.div>
        </div>
    );
};

export default LandingScreen;
