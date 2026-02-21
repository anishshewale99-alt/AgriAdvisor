import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from './context/AuthContext'
import { LanguageProvider } from './context/LanguageContext'
import './index.css'
import App from './App.jsx'
import PWAUpdatePrompt from './components/PWAUpdatePrompt.jsx'
import PWAInstallBanner from './components/PWAInstallBanner.jsx'

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <LanguageProvider>
        <AuthProvider>
          <App />
          {/* PWA Components - shown as overlays when needed */}
          <PWAUpdatePrompt />
          <PWAInstallBanner />
        </AuthProvider>
      </LanguageProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
