import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { LogIn, Phone, Mail, ArrowRight, Languages, Eye, EyeOff, ChevronRight, Sprout, User } from 'lucide-react';
import LandingImg from '../assets/landing 2.webp';
import GoogleLoginButton from '../components/GoogleLoginButton';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import HeroVideo from '../assets/hero-video.mp4';
import '../styles/LandingScreen.css';

const LandingScreen = ({ onNext, isDesktop }) => {
    const [view, setView] = useState('landing'); // 'landing', 'login', or 'signup'
    const { isEnglish, toggleLanguage, t } = useLanguage();
    const { loginEmail, register } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) return;
        setError('');
        setIsSubmitting(true);
        try {
            await loginEmail(email, password);
            onNext();
        } catch (err) {
            setError(err.message || 'Login failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        if (!email || !password || !name) return;
        if (password.length < 6) {
            setError(isEnglish ? 'Password must be at least 6 characters' : 'पासवर्ड किमान ६ अक्षरांचा असावा');
            return;
        }
        setError('');
        setIsSubmitting(true);
        try {
            await register(name, email, password);
            onNext();
        } catch (err) {
            setError(err.message || 'Signup failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Landing Page View
    if (view === 'landing') {
        return (
            <Motion.div
                key="landing"
                initial={{ opacity: 1 }}
                exit={{ opacity: isDesktop ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="landing-page"
            >
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="hero-video"
                >
                    <source src={HeroVideo} type="video/mp4" />
                </video>
                <div className="hero-dark-overlay"></div>

                {/* Top Navbar */}
                <nav className="landing-navbar">
                    <div className="nav-container-landing">
                        <div className="nav-left-landing">
                            <div className="landing-lang-toggle-container">
                                <button
                                    className="lang-toggle-landing-minimal"
                                    onClick={toggleLanguage}
                                >
                                    {isEnglish ? 'मराठी' : 'English'}
                                </button>
                            </div>
                            <div className="landing-brand">
                                <Sprout size={28} className="leaf-logo-landing" />
                                <span className="brand-name-landing">AgriAdvisor</span>
                            </div>
                        </div>

                        {!isDesktop ? (
                            <button className="mobile-menu-btn-landing" onClick={() => setView('login')}>
                                <LogIn size={24} />
                            </button>
                        ) : (
                            <div className="nav-links-landing">
                                <button onClick={() => setView('login')} className="nav-login-btn-minimal">
                                    {isEnglish ? 'Login' : 'लॉगिन'}
                                </button>
                                <button onClick={() => setView('signup')} className="hero-discover-btn" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>
                                    {isEnglish ? 'Join Now' : 'आता सामील व्हा'}
                                </button>
                            </div>
                        )}
                    </div>
                </nav>

                <Motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="hero-content-overlay"
                >
                    <h1 className="hero-title-main">AGRI-ADVISOR</h1>
                    <p className="hero-subtitle-sub">{isEnglish ? 'SMART AGRICULTURE • DATA-DRIVEN DECISIONS' : 'स्मार्ट कृषी • डेटा-चालित निर्णय'}</p>

                    <div className="hero-cta-group" style={{ display: 'flex', gap: '16px', marginTop: '24px', justifyContent: 'center' }}>
                        <button
                            onClick={() => setView('login')}
                            className="hero-discover-btn"
                            style={{ minWidth: '160px' }}
                        >
                            {isEnglish ? 'SIGN IN' : 'साइन इन'}
                        </button>
                        <button
                            onClick={() => setView('signup')}
                            className="hero-discover-btn"
                            style={{
                                minWidth: '160px',
                                background: 'white',
                                color: 'var(--primary-dark)',
                                border: '2px solid white'
                            }}
                        >
                            {isEnglish ? 'SIGN UP' : 'नोंदणी करा'}
                        </button>
                    </div>
                </Motion.div>
            </Motion.div>
        );
    }

    // Login/Signup UI Parts
    const HeroPart = () => (
        <Motion.div
            className="login-hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
                backgroundImage: `linear-gradient(rgba(46, 125, 50, 0.7), rgba(27, 94, 32, 0.8)), url(${LandingImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="hero-content">
                <Motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h1 className="hero-title">
                        {isEnglish ? 'Join Thousands of Smart Farmers' : 'हजारो स्मार्ट शेतकऱ्यांमध्ये सामील व्हा'}
                    </h1>
                    <p className="hero-subtitle">
                        {isEnglish
                            ? 'Get personalized insights and expert guidance for your farm'
                            : 'तुमच्या शेतासाठी वैयक्तिक माहिती आणि तज्ञ मार्गदर्शन मिळवा'}
                    </p>
                    <div className="hero-features">
                        <div className="feature-item">✓ {isEnglish ? 'Personalized Crop Plans' : 'वैयक्तिक पीक योजना'}</div>
                        <div className="feature-item">✓ {isEnglish ? 'Save Your Farm Data' : 'तुमचा शेत डेटा सुरक्षित करा'}</div>
                        <div className="feature-item">✓ {isEnglish ? 'Track Your Progress' : 'तुमची प्रगती ट्रॅक करा'}</div>
                        <div className="feature-item">✓ {isEnglish ? 'Connect with Experts' : 'तज्ञांशी संपर्क साधा'}</div>
                    </div>
                </Motion.div>
            </div>
        </Motion.div>
    );

    return (
        <div className="login-container">
            {isDesktop && <HeroPart />}

            <div className="login-form-container">
                <Motion.div
                    key={view}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="login-form-wrapper"
                >
                    <div className="language-toggle-container">
                        <button className="language-toggle-btn" onClick={toggleLanguage}>
                            <Languages size={18} />
                            <span>{isEnglish ? 'English' : 'मराठी'}</span>
                        </button>
                    </div>

                    <div className="login-header">
                        <h1 className="login-title">
                            {view === 'login' ? (isEnglish ? 'Sign In' : 'साइन इन करा') : (isEnglish ? 'Create Account' : 'खाते तयार करा')}
                        </h1>
                        <p className="login-subtitle">
                            {view === 'login'
                                ? (isEnglish ? 'Access your farming dashboard' : 'तुमच्या डॅशबोर्डवर प्रवेश करा')
                                : (isEnglish ? 'Start your journey with us' : 'तुमचा प्रवास सुरू करा')}
                        </p>
                    </div>

                    {import.meta.env.VITE_GOOGLE_CLIENT_ID && (
                        <>
                            <div className="social-login-section">
                                <GoogleLoginButton onSuccess={onNext} onError={() => setError('Google login failed')} />
                            </div>

                            <div className="divider">
                                <span className="divider-text">{isEnglish ? 'OR' : 'किंवा'}</span>
                            </div>
                        </>
                    )}

                    {error && (
                        <div style={{
                            background: '#fef2f2',
                            border: '1px solid #fecaca',
                            color: '#dc2626',
                            padding: '12px 16px',
                            borderRadius: '12px',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            marginBottom: '8px',
                            textAlign: 'center'
                        }}>
                            {error}
                        </div>
                    )}

                    <form className="login-form" onSubmit={view === 'login' ? handleLogin : handleSignup}>
                        {view === 'signup' && (
                            <div className="form-group">
                                <label className="form-label">{isEnglish ? 'Full Name' : 'पूर्ण नाव'}</label>
                                <div className="input-wrapper">
                                    <User size={20} className="input-icon" />
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder={isEnglish ? 'Enter your name' : 'तुमचे नाव प्रविष्ट करा'}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        <div className="form-group">
                            <label className="form-label">{isEnglish ? 'Email Address' : 'ईमेल पत्ता'}</label>
                            <div className="input-wrapper">
                                <Mail size={20} className="input-icon" />
                                <input
                                    type="email"
                                    className="form-input"
                                    placeholder={isEnglish ? 'Enter your email' : 'तुमचा ईमेल प्रविष्ट करा'}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">{isEnglish ? 'Password' : 'पासवर्ड'}</label>
                            <div className="input-wrapper">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-input"
                                    placeholder={isEnglish ? 'Enter your password' : 'तुमचा पासवर्ड प्रविष्ट करा'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    style={{ paddingRight: '45px' }}
                                    required
                                />
                                <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="submit-btn" disabled={isSubmitting}>
                            {isSubmitting
                                ? (isEnglish ? 'Processing...' : 'प्रक्रिया सुरू आहे...')
                                : (view === 'login' ? (isEnglish ? 'Sign In' : 'साइन इन करा') : (isEnglish ? 'Register' : 'नोंदणी करा'))}
                            {!isSubmitting && <ArrowRight size={20} />}
                        </button>
                    </form>

                    <div className="signup-link">
                        <span>{view === 'login' ? (isEnglish ? "Don't have an account?" : 'खाते नाही?') : (isEnglish ? "Already have an account?" : 'आधीच खाते आहे?')}</span>
                        <a href="#" onClick={(e) => { e.preventDefault(); setError(''); setView(view === 'login' ? 'signup' : 'login'); }}>
                            {view === 'login' ? (isEnglish ? 'Sign Up' : 'नोंदणी करा') : (isEnglish ? 'Sign In' : 'साइन इन करा')}
                        </a>
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '16px' }}>
                        <button onClick={() => setView('landing')} className="back-to-home-btn" style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.9rem', textDecoration: 'underline' }}>
                            {isEnglish ? '← Back to Home' : '← होम वर परत जा'}
                        </button>
                    </div>
                </Motion.div>
            </div>
        </div>
    );
};

export default LandingScreen;
