import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { LogIn, Phone, Mail, ArrowRight, Languages, Eye, EyeOff, ChevronRight, Sprout } from 'lucide-react';
import LandingImg from '../assets/landing 2.webp';
import GoogleLoginButton from '../components/GoogleLoginButton';
import { useAuth } from '../context/AuthContext';
import HeroVideo from '../assets/hero-video.mp4';
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
                                    onClick={() => setIsEnglish(!isEnglish)}
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
                            <button className="mobile-menu-btn-landing">
                                <ChevronRight size={24} />
                            </button>
                        ) : (
                            <div className="nav-links-landing">
                                <a href="#">{isEnglish ? 'Home' : 'होम'}</a>
                                <a href="#">{isEnglish ? 'About Us' : 'आमच्याबद्दल'}</a>
                                <a href="#">{isEnglish ? 'Blog' : 'ब्लॉग'}</a>
                                <a href="#">{isEnglish ? 'Contact Us' : 'संपर्क'}</a>
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

                    <button
                        onClick={() => setView('login')}
                        className="hero-discover-btn"
                    >
                        {isEnglish ? 'DISCOVER' : 'शोध घ्या'}
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
                        <GoogleLoginButton
                            onSuccess={(user) => {
                                // If user is onboarded, go to next screen
                                // If not, they'll need to complete farm info
                                onNext();
                            }}
                            onError={(error) => {
                                console.error('Login failed:', error);
                                alert(isEnglish ? 'Login failed. Please try again.' : 'लॉगिन अयशस्वी. कृपया पुन्हा प्रयत्न करा.');
                            }}
                        />
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
