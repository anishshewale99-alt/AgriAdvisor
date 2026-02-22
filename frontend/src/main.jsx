import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from './context/AuthContext'
import { LanguageProvider } from './context/LanguageContext'
import './index.css'
import App from './App.jsx'
import PWAUpdatePrompt from './components/PWAUpdatePrompt.jsx'
import PWAInstallBanner from './components/PWAInstallBanner.jsx'

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '216336910908-v4p6q34ljgn9fo2f49bbospd7s8044sv.apps.googleusercontent.com';

const AppWrapper = () => {
  if (GOOGLE_CLIENT_ID) {
    return (
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <LanguageProvider>
          <AuthProvider>
            <App />
            <PWAUpdatePrompt />
            <PWAInstallBanner />
          </AuthProvider>
        </LanguageProvider>
      </GoogleOAuthProvider>
    );
  }

  return (
    <LanguageProvider>
      <AuthProvider>
        <App />
        <PWAUpdatePrompt />
        <PWAInstallBanner />
      </AuthProvider>
    </LanguageProvider>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>,
)
