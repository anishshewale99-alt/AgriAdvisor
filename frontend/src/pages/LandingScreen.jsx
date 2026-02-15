import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { LogIn, Phone, Mail, ArrowRight, Languages, Eye, EyeOff, ChevronRight } from 'lucide-react';
import LandingImg from '../assets/landing 2.webp';
import '../styles/LandingScreen.css';

const LandingScreen = ({ onNext, isDesktop }) => {
    const [view, setView] = useState('landing'); // 'landing' or 'login'
    const [isEnglish, setIsEnglish] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Landing Page View
    if (view === 'landing') {
        return (
            <Motion.div
                key="landing"
                initial={{ opacity: 1 }}
                exit={{ opacity: isDesktop ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="landing-page"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url(${LandingImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: isDesktop ? 'flex-start' : 'center',
                    padding: isDesktop ? '0 100px' : '40px 20px',
                    position: 'relative'
                }}
            >
                {/* Language Toggle */}
                <div style={{
                    position: 'absolute',
                    top: '30px',
                    right: isDesktop ? '60px' : '20px'
                }}>
                    <button
                        className="language-toggle-btn-landing"
                        onClick={() => setIsEnglish(!isEnglish)}
                    >
                        <Languages size={18} />
                        <span>{isEnglish ? 'English' : 'मराठी'}</span>
                    </button>
                </div>

                <Motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{
                        maxWidth: '700px',
                        textAlign: isDesktop ? 'left' : 'center'
                    }}
                >
                    <h1 style={{
                        color: 'white',
                        fontSize: isDesktop ? '4rem' : '2.5rem',
                        fontWeight: 800,
                        lineHeight: 1.1,
                        marginBottom: '24px',
                        textShadow: '0 4px 20px rgba(0,0,0,0.5)'
                    }}>
                        {isEnglish
                            ? 'Your harvest begins with the right decision'
                            : 'तुमची कापणी योग्य निर्णयाने सुरू होते'}
                    </h1>

                    <p style={{
                        color: 'rgba(255,255,255,0.95)',
                        fontSize: '1.35rem',
                        marginBottom: '20px',
                        fontWeight: 500,
                        textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                    }}>
                        {isEnglish ? 'Sow Right, Grow Bright.' : 'योग्य पेरा, उज्ज्वल वाढ.'}
                    </p>

                    <div style={{
                        display: 'grid',
                        gap: '12px',
                        marginBottom: '40px',
                        color: 'rgba(255,255,255,0.9)',
                        fontSize: '1.1rem'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ fontSize: '1.5rem' }}>✓</span>
                            <span>{isEnglish ? 'Smart Crop Recommendations' : 'स्मार्ट पीक शिफारसी'}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ fontSize: '1.5rem' }}>✓</span>
                            <span>{isEnglish ? 'Real-time Weather Updates' : 'रिअल-टाइम हवामान अद्यतने'}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ fontSize: '1.5rem' }}>✓</span>
                            <span>{isEnglish ? 'Market Price Insights' : 'बाजार भाव माहिती'}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ fontSize: '1.5rem' }}>✓</span>
                            <span>{isEnglish ? 'Expert Agricultural Advice' : 'तज्ञ कृषी सल्ला'}</span>
                        </div>
                    </div>

                    <button
                        onClick={() => setView('login')}
                        style={{
                            background: 'var(--accent-yellow)',
                            color: '#1a232e',
                            border: 'none',
                            padding: '18px 48px',
                            fontSize: '1.25rem',
                            fontWeight: 800,
                            borderRadius: '12px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '12px',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 12px 32px rgba(0,0,0,0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)';
                        }}
                    >
                        {isEnglish ? 'Get Started' : 'सुरू करा'}
                        <ChevronRight size={24} />
                    </button>
                </Motion.div>
            </Motion.div>
        );
    }

    // Login Page View
    return (
        <Motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="login-container"
        >
            {/* Left Side - Hero Image (Desktop Only) */}
            {isDesktop && (
                <Motion.div
                    className="login-hero"
                    initial={{ x: 0 }}
                    animate={{ x: 0 }}
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
            )}

            {/* Right Side - Login Form */}
            <div className="login-form-container">
                <Motion.div
                    initial={{ opacity: 0, x: isDesktop ? 100 : 0, y: isDesktop ? 0 : 20 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="login-form-wrapper"
                >
                    {/* Language Toggle */}
                    <div className="language-toggle-container">
                        <button
                            className="language-toggle-btn"
                            onClick={() => setIsEnglish(!isEnglish)}
                        >
                            <Languages size={18} />
                            <span>{isEnglish ? 'English' : 'मराठी'}</span>
                        </button>
                    </div>

                    {/* Title (No Logo) */}
                    <div className="login-header">
                        <h1 className="login-title">
                            {isEnglish ? 'Sign In' : 'साइन इन करा'}
                        </h1>
                        <p className="login-subtitle">
                            {isEnglish
                                ? 'Enter your credentials to access your account'
                                : 'तुमच्या खात्यात प्रवेश करण्यासाठी तुमची माहिती प्रविष्ट करा'}
                        </p>
                    </div>

                    {/* Social Login Buttons */}
                    <div className="social-login-section">
                        <button className="social-login-btn google-btn" onClick={onNext}>
                            <img
                                src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png"
                                alt="Google"
                                className="social-icon"
                            />
                            <span>{isEnglish ? 'Continue with Google' : 'Google सह सुरू करा'}</span>
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="divider">
                        <span className="divider-text">{isEnglish ? 'OR' : 'किंवा'}</span>
                    </div>

                    {/* Email/Password Form */}
                    <form className="login-form" onSubmit={(e) => { e.preventDefault(); onNext(); }}>
                        <div className="form-group">
                            <label className="form-label">
                                {isEnglish ? 'Email Address' : 'ईमेल पत्ता'}
                            </label>
                            <div className="input-wrapper">
                                <Mail size={20} className="input-icon" />
                                <input
                                    type="email"
                                    className="form-input"
                                    placeholder={isEnglish ? 'Enter your email' : 'तुमचा ईमेल प्रविष्ट करा'}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                {isEnglish ? 'Password' : 'पासवर्ड'}
                            </label>
                            <div className="input-wrapper">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-input"
                                    placeholder={isEnglish ? 'Enter your password' : 'तुमचा पासवर्ड प्रविष्ट करा'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    style={{ paddingRight: '45px' }}
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="form-options">
                            <label className="remember-me">
                                <input type="checkbox" />
                                <span>{isEnglish ? 'Remember me' : 'मला लक्षात ठेवा'}</span>
                            </label>
                            <a href="#" className="forgot-password">
                                {isEnglish ? 'Forgot Password?' : 'पासवर्ड विसरलात?'}
                            </a>
                        </div>

                        <button type="submit" className="submit-btn">
                            {isEnglish ? 'Sign In' : 'साइन इन करा'}
                            <ArrowRight size={20} />
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <div className="signup-link">
                        <span>{isEnglish ? "Don't have an account?" : 'खाते नाही?'}</span>
                        <a href="#" onClick={onNext}>
                            {isEnglish ? 'Sign Up' : 'नोंदणी करा'}
                        </a>
                    </div>

                    {/* Back to Landing */}
                    <div style={{ textAlign: 'center', marginTop: '16px' }}>
                        <button
                            onClick={() => setView('landing')}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--text-muted)',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                textDecoration: 'underline'
                            }}
                        >
                            {isEnglish ? '← Back to Home' : '← होम वर परत जा'}
                        </button>
                    </div>
                </Motion.div>
            </div>
        </Motion.div>
    );
};

export default LandingScreen;
