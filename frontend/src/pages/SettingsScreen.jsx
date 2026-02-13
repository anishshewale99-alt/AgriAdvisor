import React from 'react';
import {
    Globe,
    Bell,
    Moon,
    Sun,
    ChevronRight,
    LogOut,
    Languages
} from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import '../styles/SettingsScreen.css';

const SettingsScreen = ({ darkMode, isDarkMode, setIsDarkMode, toggleTheme, lang, setLang, onLogout, isDesktop }) => {
    const settings = [
        {
            id: 'language',
            icon: Globe,
            label_mr: 'भाषा बदला',
            label_en: 'Change Language',
            value: lang === 'mr' ? 'मराठी' : 'English',
            onClick: () => setLang(lang === 'mr' ? 'en' : 'mr'),
            color: '#4CAF50'
        },
        {
            id: 'notifications',
            icon: Bell,
            label_mr: 'सूचना',
            label_en: 'Notifications',
            color: '#FF9800'
        },
        {
            id: 'theme',
            icon: isDarkMode ? Sun : Moon,
            label_mr: isDarkMode ? 'लाईट मोड' : 'डार्क मोड',
            label_en: isDarkMode ? 'Light Mode' : 'Dark Mode',
            isToggle: true,
            onClick: toggleTheme,
            color: isDarkMode ? '#FFD54F' : '#607D8B'
        }
    ].filter(item => isDesktop ? item.id !== 'language' : true);

    return (
        <Motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
                width: '100%',
                margin: '0 auto',
                padding: '20px'
            }}
        >
            {/* Language Selection - only on mobile */}
            {!isDesktop && (
                <div style={{
                    background: isDarkMode ? '#1f2937' : 'white',
                    borderRadius: '20px',
                    padding: '24px',
                    marginBottom: '20px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                    border: isDarkMode ? '1px solid #374151' : '1px solid #f0f0f0'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                        <div style={{ padding: '8px', background: 'rgba(46, 125, 50, 0.1)', borderRadius: '12px' }}>
                            <Languages size={20} color="var(--primary)" />
                        </div>
                        <h3 className="marathi" style={{ fontSize: '1.1rem', color: isDarkMode ? '#fff' : '#1f2937' }}>
                            {lang === 'mr' ? 'भाषा निवडा' : 'Select Language'}
                        </h3>
                    </div>

                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button
                            onClick={() => setLang('mr')}
                            style={{
                                flex: 1,
                                padding: '16px',
                                borderRadius: '16px',
                                border: lang === 'mr' ? '2px solid var(--primary)' : '1px solid #eee',
                                background: lang === 'mr' ? 'rgba(46, 125, 50, 0.05)' : 'transparent',
                                color: lang === 'mr' ? 'var(--primary)' : (isDarkMode ? '#9ca3af' : '#6b7280'),
                                fontWeight: 700,
                                transition: 'all 0.2s ease'
                            }}
                        >
                            मराठी
                        </button>
                        <button
                            onClick={() => setLang('en')}
                            style={{
                                flex: 1,
                                padding: '16px',
                                borderRadius: '16px',
                                border: lang === 'en' ? '2px solid var(--primary)' : '1px solid #eee',
                                background: lang === 'en' ? 'rgba(46, 125, 50, 0.05)' : 'transparent',
                                color: lang === 'en' ? 'var(--primary)' : (isDarkMode ? '#9ca3af' : '#6b7280'),
                                fontWeight: 700,
                                transition: 'all 0.2s ease'
                            }}
                        >
                            English
                        </button>
                    </div>
                </div>
            )}
            <div style={{
                background: isDarkMode ? '#111827' : 'white',
                borderRadius: '24px',
                padding: '24px',
                boxShadow: isDarkMode ? '0 10px 30px rgba(0,0,0,0.5)' : '0 10px 30px rgba(0,0,0,0.06)',
                border: isDarkMode ? '1px solid #374151' : '1px solid #f0f0f0',
                width: '100%',
                color: isDarkMode ? '#f3f4f6' : '#111827'
            }}>
                <div style={{ marginBottom: '32px' }}>
                    <h1 className="marathi" style={{ fontSize: '1.75rem', color: isDarkMode ? '#fff' : 'var(--primary-dark)', marginBottom: '4px' }}>
                        {lang === 'en' ? 'Settings' : 'सेटिंग्ज'}
                    </h1>
                    <p className="english-sub" style={{ fontSize: '1rem', color: isDarkMode ? '#9ca3af' : 'var(--text-muted)' }}>
                        {lang === 'en' ? 'Manage your preferences' : 'तुमच्या आवडीनिवडी व्यवस्थापित करा'}
                    </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {settings.map((item) => (
                        <div
                            key={item.id}
                            onClick={item.onClick}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '16px',
                                background: isDarkMode ? '#1f2937' : '#f9fafb',
                                borderRadius: '18px',
                                cursor: 'pointer',
                                border: isDarkMode ? '1px solid #374151' : '1px solid #f0f0f0',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div style={{
                                    background: `${item.color}20`,
                                    padding: '10px',
                                    borderRadius: '12px',
                                    color: item.color,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <item.icon size={20} />
                                </div>
                                <div>
                                    <div className="marathi" style={{ fontSize: '1rem', fontWeight: 700, color: isDarkMode ? '#fff' : 'var(--text-main)' }}>
                                        {lang === 'en' ? item.label_en : item.label_mr}
                                    </div>
                                    <div className="english-sub" style={{ fontSize: '0.75rem', color: isDarkMode ? '#9ca3af' : 'var(--text-muted)' }}>
                                        {lang === 'en' ? item.label_mr : item.label_en}
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                {item.isToggle ? (
                                    <div style={{
                                        width: '44px',
                                        height: '24px',
                                        background: isDarkMode ? 'var(--primary)' : '#d1d5db',
                                        borderRadius: '12px',
                                        position: 'relative',
                                        transition: 'all 0.3s'
                                    }}>
                                        <div style={{
                                            width: '18px',
                                            height: '18px',
                                            background: 'white',
                                            borderRadius: '50%',
                                            position: 'absolute',
                                            top: '3px',
                                            left: isDarkMode ? '23px' : '3px',
                                            transition: 'all 0.3s'
                                        }} />
                                    </div>
                                ) : (
                                    <>
                                        {item.value && (
                                            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)' }}>
                                                {item.value}
                                            </span>
                                        )}
                                        <ChevronRight size={18} color={isDarkMode ? '#4b5563' : '#cbd5e1'} />
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '40px' }}>
                    <button
                        onClick={onLogout}
                        style={{
                            width: '100%',
                            padding: '16px',
                            borderRadius: '18px',
                            background: isDarkMode ? 'rgba(239, 68, 68, 0.1)' : '#fff1f2',
                            border: isDarkMode ? '1px solid rgba(239, 68, 68, 0.2)' : '1px solid #ffe4e6',
                            color: '#ef4444',
                            fontWeight: 800,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        <LogOut size={20} />
                        <span className="marathi">{lang === 'en' ? 'Log Out' : 'लॉगआउट'}</span>
                    </button>
                </div>
            </div>
        </Motion.div>
    );
};

export default SettingsScreen;
