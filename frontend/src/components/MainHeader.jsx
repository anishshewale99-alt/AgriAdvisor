import React from 'react';
import { Menu, ArrowLeft, Volume2 } from 'lucide-react';

const MainHeader = ({ screen, setScreen, setTab, isScrolled, lang, setLang, setIsMenuOpen, handleTTS, isSpeaking, isDesktop, isDarkMode, previousCropScreen }) => (
    <div className="top-bar flex items-center justify-between gap-2" style={{
        width: '100%',
        margin: '0 auto',
        background: isDesktop ? (isScrolled || screen !== 'home' ? (isScrolled ? 'rgba(255,255,255,0.8)' : 'white') : 'transparent') : (isDarkMode ? '#0f172a' : 'white'),
        boxShadow: (isScrolled || screen !== 'home' || !isDesktop) ? '0 4px 20px rgba(0,0,0,0.06)' : 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        transition: 'all 0.3s ease',
        zIndex: 1100,
        padding: isDesktop ? '16px 40px' : '16px 20px',
        backdropFilter: (isScrolled && isDesktop) ? 'blur(10px)' : 'none',
        borderBottom: (isScrolled || !isDesktop) ? (isDarkMode ? '1px solid #1e293b' : '1px solid rgba(0,0,0,0.05)') : 'none'
    }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {!isDesktop && (
                <button onClick={() => setIsMenuOpen(true)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', color: isDarkMode ? '#fff' : 'var(--primary)' }}>
                    <Menu size={24} />
                </button>
            )}

            {screen !== 'home' && (
                <button
                    onClick={() => {
                        if (screen === 'all-crops') {
                            setScreen('recommendations');
                            setTab('crops');
                        } else if (screen === 'crop-detail') {
                            setScreen(previousCropScreen || 'recommendations');
                            setTab('crops');
                        } else {
                            setScreen('home');
                            setTab('home');
                        }
                    }}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', color: (isScrolled || screen !== 'home' || isDarkMode) ? (isDarkMode ? '#fff' : 'var(--primary)') : (isDesktop ? 'var(--primary)' : 'white') }}
                >
                    <ArrowLeft size={24} />
                </button>
            )}

            <span className="title" style={{
                letterSpacing: '-0.5px',
                color: isScrolled || screen !== 'home' ? 'var(--primary)' : (isDesktop ? 'var(--primary)' : 'white'),
                transition: 'all 0.3s ease',
                fontSize: isDesktop ? '1.5rem' : '1.25rem',
                fontWeight: 800
            }}>CropAdvisor</span>
        </div>

        <div className="flex items-center gap-2">
            {!isDesktop && (
                <div className="lang" onClick={() => setLang(lang === 'mr' ? 'en' : 'mr')} style={{
                    cursor: 'pointer',
                    background: lang === 'mr' ? 'var(--primary)' : 'white',
                    color: lang === 'mr' ? 'white' : 'var(--text-main)',
                    padding: '6px 16px',
                    borderRadius: '24px',
                    border: '1px solid #eee',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                    textAlign: 'center'
                }}>
                    {lang === 'mr' ? 'मराठी' : 'English'}
                </div>
            )}

            {isDesktop && (
                <div className="lang-toggle-nav" onClick={() => setLang(lang === 'mr' ? 'en' : 'mr')} style={{
                    cursor: 'pointer',
                    background: 'rgba(46, 125, 50, 0.1)',
                    color: 'var(--primary)',
                    padding: '8px 16px',
                    borderRadius: '12px',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    border: '1px solid rgba(46, 125, 50, 0.2)',
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'center',
                    marginRight: '8px'
                }}>
                    <span style={{ opacity: lang === 'mr' ? 1 : 0.4 }}>मराठी</span>
                    <div style={{ width: '1px', height: '14px', background: 'rgba(46, 125, 50, 0.3)' }} />
                    <span style={{ opacity: lang === 'en' ? 1 : 0.4 }}>English</span>
                </div>
            )}

            <div onClick={handleTTS} style={{
                cursor: 'pointer',
                background: isDarkMode ? '#1f2937' : 'white',
                padding: '10px',
                borderRadius: '50%',
                border: isDarkMode ? '1px solid #374151' : '1px solid #eee',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: isDesktop ? '42px' : '38px',
                height: isDesktop ? '42px' : '38px',
                flexShrink: 0,
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                transition: 'all 0.2s'
            }}>
                <Volume2 size={isDesktop ? 22 : 20} color={isSpeaking ? 'var(--primary)' : (isDarkMode ? '#9ca3af' : '#64748b')} />
            </div>
        </div>
    </div>
);

export default MainHeader;
