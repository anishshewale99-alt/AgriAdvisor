import React from 'react';
import { Menu, ArrowLeft, Volume2, Sprout } from 'lucide-react';
import LanguageToggle from './LanguageToggle';

const MainHeader = ({ screen, setScreen, setTab, lang, setLang, setIsMenuOpen, handleTTS, isSpeaking, isDesktop, isDarkMode, previousCropScreen }) => (
    <div className="top-bar flex items-center justify-between gap-2" style={{
        width: '100%',
        margin: '0 auto',
        background: isDarkMode ? '#0f172a' : 'white',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        transition: 'all 0.3s ease',
        zIndex: 1100,
        padding: isDesktop ? '16px 40px' : '16px 20px',
        backdropFilter: 'blur(10px)',
        borderBottom: isDarkMode ? '1px solid #1e293b' : '1px solid rgba(0,0,0,0.05)'
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
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', color: isDarkMode ? '#fff' : 'var(--primary)' }}
                >
                    <ArrowLeft size={24} />
                </button>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Sprout size={isDesktop ? 28 : 24} style={{ color: '#4CAF50' }} />
                <span className="title" style={{
                    letterSpacing: '-0.5px',
                    color: isDarkMode ? '#fff' : 'var(--primary)',
                    transition: 'all 0.3s ease',
                    fontSize: isDesktop ? '1.5rem' : '1.25rem',
                    fontWeight: 800
                }}>AgriAdvisor</span>
            </div>
        </div>

        <div className="flex items-center gap-4">
            <LanguageToggle lang={lang} setLang={setLang} isDarkMode={isDarkMode} />

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

