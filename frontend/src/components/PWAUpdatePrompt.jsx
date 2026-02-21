import { useEffect, useState } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

/**
 * PWAUpdatePrompt - Shows a banner when a new service worker update is available.
 */
export default function PWAUpdatePrompt() {
    const [showPrompt, setShowPrompt] = useState(false);

    const {
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegistered(r) {
            console.log('[AgriAdvisor PWA] Service worker registered:', r);
        },
        onRegisterError(error) {
            console.error('[AgriAdvisor PWA] SW registration error:', error);
        },
    });

    useEffect(() => {
        if (needRefresh) setShowPrompt(true);
    }, [needRefresh]);

    const handleUpdate = () => {
        updateServiceWorker(true);
        setShowPrompt(false);
    };

    const handleDismiss = () => {
        setNeedRefresh(false);
        setShowPrompt(false);
    };

    if (!showPrompt) return null;

    return (
        <div
            id="pwa-update-prompt"
            style={{
                position: 'fixed',
                bottom: '80px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 9999,
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
                animation: 'slideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
        >
            <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateX(-50%) translateY(20px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>

            {/* Icon */}
            <div style={{
                width: '40px', height: '40px', minWidth: '40px',
                background: 'rgba(255, 193, 7, 0.15)',
                borderRadius: '10px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1px solid rgba(255, 193, 7, 0.4)',
            }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFC107" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
            </div>

            {/* Text */}
            <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontWeight: 700, fontSize: '0.875rem', color: '#FFF9C4' }}>
                    Update Available!
                </p>
                <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: 'rgba(255, 243, 176, 0.85)' }}>
                    A new version of AgriAdvisor is ready.
                </p>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                <button
                    id="pwa-dismiss-btn"
                    onClick={handleDismiss}
                    style={{
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.25)',
                        color: '#c8e6c9',
                        borderRadius: '8px', padding: '6px 10px',
                        fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600,
                    }}
                >
                    Later
                </button>
                <button
                    id="pwa-update-btn"
                    onClick={handleUpdate}
                    style={{
                        background: 'linear-gradient(135deg, #FFC107, #FFD54F)',
                        border: 'none', color: '#1B5E20',
                        borderRadius: '8px', padding: '6px 12px',
                        fontSize: '0.75rem', cursor: 'pointer', fontWeight: 700,
                        boxShadow: '0 2px 8px rgba(255, 193, 7, 0.45)',
                    }}
                >
                    Update
                </button>
            </div>
        </div>
    );
}
