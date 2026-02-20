import { useState, useEffect } from 'react';

/**
 * PWAInstallBanner - Shows an install prompt when the app can be installed as a PWA.
 */
export default function PWAInstallBanner() {
    const [installPrompt, setInstallPrompt] = useState(null);
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const isStandalone =
            window.matchMedia('(display-mode: standalone)').matches ||
            window.navigator.standalone === true;
        if (isStandalone) return;

        const dismissed = localStorage.getItem('pwa-install-dismissed');
        if (dismissed) return;

        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setInstallPrompt(e);
            setShowBanner(true);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    }, []);

    const handleInstall = async () => {
        if (!installPrompt) return;
        await installPrompt.prompt();
        setInstallPrompt(null);
        setShowBanner(false);
    };

    const handleDismiss = () => {
        localStorage.setItem('pwa-install-dismissed', '1');
        setShowBanner(false);
    };

    if (!showBanner) return null;

    return (
        <div
            id="pwa-install-banner"
            style={{
                position: 'fixed',
                bottom: '80px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 9998,
                background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
                color: '#fff',
                padding: '14px 20px',
                borderRadius: '16px',
                boxShadow: '0 8px 32px rgba(46, 125, 50, 0.35)',
                border: '1px solid rgba(67, 160, 71, 0.4)',
                backdropFilter: 'blur(12px)',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                maxWidth: '360px',
                width: 'calc(100% - 40px)',
                animation: 'slideUpInstall 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
        >
            <style>{`
        @keyframes slideUpInstall {
          from { opacity: 0; transform: translateX(-50%) translateY(20px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>

            {/* App Icon */}
            <div style={{
                width: '44px', height: '44px', minWidth: '44px',
                borderRadius: '12px', overflow: 'hidden',
                border: '1px solid rgba(255, 193, 7, 0.4)',
                background: 'rgba(255, 193, 7, 0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
                <img src="/agriadvisor-icon.png" alt="AgriAdvisor" style={{ width: '36px', height: '36px' }} />
            </div>

            {/* Text */}
            <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontWeight: 700, fontSize: '0.875rem', color: '#FFF9C4' }}>
                    Install AgriAdvisor
                </p>
                <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: 'rgba(255, 243, 176, 0.85)' }}>
                    Add to home screen for offline access
                </p>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                <button
                    id="pwa-install-dismiss-btn"
                    onClick={handleDismiss}
                    style={{
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.25)',
                        color: '#c8e6c9',
                        borderRadius: '8px', padding: '6px 10px',
                        fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600,
                    }}
                >
                    ✕
                </button>
                <button
                    id="pwa-install-btn"
                    onClick={handleInstall}
                    style={{
                        background: 'linear-gradient(135deg, #FFC107, #FFD54F)',
                        border: 'none', color: '#1B5E20',
                        borderRadius: '8px', padding: '6px 12px',
                        fontSize: '0.75rem', cursor: 'pointer', fontWeight: 700,
                        boxShadow: '0 2px 8px rgba(255, 193, 7, 0.45)',
                    }}
                >
                    Install
                </button>
            </div>
        </div>
    );
}
