import React, { useState } from 'react';
import {
  Home,
  Sprout,
  Users,
  User,
  Mic,
  Volume2,
  Sun,
  Droplets,
  AlertTriangle,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Wind,
  MapPin,
  Menu,
  ArrowLeft,
  Settings
} from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

import LandingScreen from './components/LandingScreen';
import FarmInfoScreen from './components/FarmInfoScreen';
import MarketTicker from './components/MarketTicker';
import VoiceModal from './components/VoiceModal';
import CommunityScreen from './components/CommunityScreen';
import ProfileScreen from './components/ProfileScreen';
import SettingsScreen from './components/SettingsScreen';
import SideMenu from './components/SideMenu';
import CropAnalysis from './components/CropAnalysis';
import CropRecommendationScreen from './components/CropRecommendationScreen';
import CropDetailScreen from './components/CropDetailScreen';
import LightBg from './assets/light.png';
import DarkBg from './assets/bg2.png';
import FarmPattern from './assets/image.png';

const BottomNav = ({ activeTab, setTab, setScreen }) => (
  <div className="bottom-nav" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
    <div style={{ width: '100%', maxWidth: '540px', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
      <div className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
        onClick={() => { setTab('home'); setScreen('home'); }}>
        <Home size={22} />
        <span>होम<br />Home</span>
      </div>
      <div className={`nav-item ${activeTab === 'crops' ? 'active' : ''}`}
        onClick={() => { setTab('crops'); setScreen('recommendations'); }}>
        <Sprout size={22} />
        <span>पीके<br />Crops</span>
      </div>
      <div className={`nav-item ${activeTab === 'community' ? 'active' : ''}`}
        onClick={() => { setTab('community'); setScreen('community'); }}>
        <Users size={22} />
        <span>समुदाय<br />Comm</span>
      </div>
      <div className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
        onClick={() => { setTab('profile'); setScreen('profile'); }}>
        <User size={22} />
        <span>प्रोफाइल<br />Profile</span>
      </div>
      <div className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
        onClick={() => { setTab('settings'); setScreen('settings'); }}>
        <Settings size={22} />
        <span>सेटिंग्ज<br />Settings</span>
      </div>
    </div>
  </div>
);

const HomeScreen = ({ lang, setLang, setIsVoiceOpen, setScreen, setTab, isDarkMode }) => {
  const [weather, setWeather] = React.useState(null);

  React.useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=18.52&longitude=73.85&current_weather=true')
      .then(res => res.json())
      .then(data => setWeather(data.current_weather))
      .catch(err => console.error("Weather fetch failed:", err));
  }, []);

  return (
    <>
      <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="app-shell" style={{ background: 'transparent', paddingLeft: '20px', paddingRight: '20px', width: '100%', maxWidth: '540px' }}>
        <div style={{
          background: isDarkMode ? '#111827' : 'white',
          borderRadius: '24px',
          padding: '24px',
          boxShadow: isDarkMode ? '0 10px 40px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.1)',
          width: '100%',
          margin: '0 auto 40px',
          color: isDarkMode ? '#f3f4f6' : '#111827',
          border: isDarkMode ? '1px solid #374151' : 'none'
        }}>
          <MarketTicker />

          <div className="season-chip" style={{ margin: '16px 0' }}>
            रबी हंगाम – फेब्रुवारी 2026 | Rabi Season - Feb 2026
          </div>

          <div className="weather-card" style={{ color: isDarkMode ? '#f3f4f6' : '#1f2937', margin: '0 0 20px', padding: '20px', boxShadow: 'none', border: isDarkMode ? '1px solid #374151' : '1px solid #f0f0f0', background: isDarkMode ? '#1f2937' : 'transparent', borderRadius: '16px' }}>
            {weather ? (
              <>
                <div className="weather-header">
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={16} />
                      <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>पुणे, महाराष्ट्र</span>
                    </div>
                    <div className="weather-temp">{weather.temperature}°C</div>
                    <div style={{ fontSize: '1rem', fontWeight: 700, marginTop: '4px' }}>स्वच्छ आकाश / Clear Sky</div>
                  </div>
                  <Sun size={64} color="#ffd54f" />
                </div>
                <div className="weather-stats">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Droplets size={16} />
                    <span style={{ fontWeight: 600 }}>आद्रता 45%</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Wind size={16} />
                    <span style={{ fontWeight: 600 }}>वारा {weather.windspeed} km/h</span>
                  </div>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px', fontWeight: 700 }}>Loading weather...</div>
            )}
          </div>

          <div className="alert-card">
            <div style={{ background: 'var(--accent-yellow)', padding: '8px', borderRadius: '10px' }}>
              <AlertTriangle size={20} color="var(--text-main)" />
            </div>
            <div>
              <div className="marathi">पुढच्या आठवड्यात उष्णतेचा धोका</div>
              <div className="english-sub">Heat risk warning next week</div>
            </div>
          </div>

          <div className="insight-grid">
            <div className="insight-card">
              <div className="marathi" style={{ fontSize: '1rem', marginBottom: '8px' }}>द्राक्ष काढा / Harvest Grapes</div>
              <div className="badge success" style={{ background: isDarkMode ? 'rgba(34, 197, 94, 0.2)' : '#E8F5E9', color: isDarkMode ? '#86efac' : '#2E7D32', padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <TrendingUp size={12} /> ↑ High Demand
              </div>
            </div>
            <div className="insight-card">
              <div className="marathi" style={{ fontSize: '1rem', marginBottom: '8px' }}>जोखीम पातळी / Risk Level</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, marginBottom: '4px' }}>
                <span>Medium</span>
                <span>60%</span>
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: '60%', background: 'var(--accent-yellow)' }}></div>
              </div>
            </div>
          </div>

          <div style={{ margin: '0 0 24px', padding: '20px', background: isDarkMode ? '#1f2937' : 'white', borderRadius: '24px', display: 'flex', gap: '16px', boxShadow: isDarkMode ? 'none' : '0 4px 15px rgba(0,0,0,0.05)', border: isDarkMode ? '1px solid #374151' : '1px solid #f0f0f0' }}>
            <div style={{ background: 'var(--primary-dark)', padding: '10px', borderRadius: '12px', alignSelf: 'flex-start', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Lightbulb size={24} color="white" />
            </div>
            <div>
              <div className="marathi" style={{ marginBottom: '4px', color: isDarkMode ? '#f3f4f6' : '#374151', fontSize: '0.95rem' }}>सेंद्रिय खतांचा वापर वाढवा आणि जमिनीचा पोत सुधारा.</div>
              <div className="english-sub" style={{ color: isDarkMode ? '#9ca3af' : '#6b7280', fontSize: '0.75rem' }}>Increase the use of organic fertilizers to improve soil texture.</div>
            </div>
          </div>

          <button className="cta-btn" onClick={() => { setScreen('recommendations'); setTab('crops'); }}>
            <div className="marathi" style={{ fontSize: '1.2rem' }}>पीक शिफारसी मिळवा 🌱</div>
            <div className="english-sub" style={{ color: 'rgba(255,255,255,0.8)' }}>Get Crop Recommendations</div>
          </button>
        </div>
      </Motion.div>
    </>
  );
};

// Replaced by CropRecommendationScreen.jsx component

// Replaced by CropDetailScreen.jsx component

const MainHeader = ({ screen, setScreen, setTab, isScrolled, lang, setLang, setIsMenuOpen, handleTTS, isSpeaking }) => (
  <div className="top-bar" style={{
    width: '100%',
    maxWidth: '540px',
    margin: '0 auto',
    background: isScrolled || screen !== 'home' ? (isScrolled ? 'rgba(255,255,255,0.95)' : 'white') : 'transparent',
    boxShadow: isScrolled || screen !== 'home' ? '0 4px 20px rgba(0,0,0,0.06)' : 'none',
    position: 'sticky',
    top: 0,
    transition: 'all 0.3s ease',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    backdropFilter: isScrolled ? 'blur(10px)' : 'none'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      {screen === 'home' ? (
        <button onClick={() => setIsMenuOpen(true)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', color: isScrolled ? 'var(--primary)' : 'white' }}>
          <Menu size={24} />
        </button>
      ) : (
        <button onClick={() => { setScreen('home'); setTab('home'); }} style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', color: 'var(--primary)' }}>
          <ArrowLeft size={24} />
        </button>
      )}
      <span className="title" style={{
        letterSpacing: '-0.5px',
        color: isScrolled || screen !== 'home' ? 'var(--primary)' : 'white',
        transition: 'all 0.3s ease'
      }}>CropAdvisor</span>
    </div>
    <div className="right" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      {screen !== 'profile' && screen !== 'recommendations' && (
        <div className="lang" onClick={() => setLang(lang === 'mr' ? 'en' : 'mr')} style={{
          cursor: 'pointer',
          background: lang === 'mr' ? 'var(--primary)' : 'white',
          color: lang === 'mr' ? 'white' : 'var(--text-main)',
          padding: '8px 20px',
          borderRadius: '24px',
          border: '1px solid #eee',
          fontSize: '0.9rem',
          fontWeight: 700,
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          minWidth: '100px',
          textAlign: 'center'
        }}>
          {lang === 'mr' ? 'मराठी' : 'English'}
        </div>
      )}
      {screen === 'home' && (
        <div onClick={handleTTS} style={{ cursor: 'pointer', background: 'white', padding: '8px', borderRadius: '50%', border: '1px solid #eee', display: 'flex' }}>
          <Volume2 size={20} color={isSpeaking ? 'var(--primary)' : '#9ca3af'} />
        </div>
      )}
    </div>
  </div>
);

function App() {
  const [onboarding, setOnboarding] = useState('landing');
  const [activeTab, setActiveTab] = useState('home');
  const [screen, setScreen] = useState('home');
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [lang, setLang] = useState('mr');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [farmDetails, setFarmDetails] = useState({});

  // Background Logic
  let bgImage = null;
  if (onboarding !== 'landing') {
    bgImage = isDarkMode ? DarkBg : LightBg;
  }

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTTS = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(lang === 'mr' ? 'क्रॉप ॲडव्हायझरमध्ये आपले स्वागत आहे. सध्या रबी हंगाम आहे.' : 'Welcome to CropAdvisor. It is currently Rabi Season.');
    utterance.lang = lang === 'mr' ? 'mr-IN' : 'en-US';
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div
      className={`${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} bg-fixed bg-cover bg-center bg-no-repeat w-full min-h-screen`}
      style={{
        backgroundImage: bgImage ? `url(${bgImage})` : 'none',
      }}
    >
      <AnimatePresence mode="wait">
        {onboarding === 'landing' && (
          <LandingScreen key="landing" onNext={() => setOnboarding('farm_info')} />
        )}
        {onboarding === 'farm_info' && (
          <FarmInfoScreen
            key="farm_info"
            farmInfo={farmDetails}
            setFarmInfo={setFarmDetails}
            onNext={(data) => {
              if (data) setFarmDetails(data);
              setOnboarding('finished');
              setScreen('recommendations');
              setActiveTab('crops');
            }}
            onBack={() => setOnboarding('landing')}
          />
        )}

        {onboarding === 'finished' && (
          <div
            key="app-finished"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              minHeight: '100vh',
            }}
          >
            <MainHeader
              screen={screen}
              setScreen={setScreen}
              setTab={setActiveTab}
              isScrolled={isScrolled}
              lang={lang}
              setLang={setLang}
              setIsMenuOpen={setIsMenuOpen}
              handleTTS={handleTTS}
              isSpeaking={isSpeaking}
            />

            <SideMenu
              isOpen={isMenuOpen}
              onClose={() => setIsMenuOpen(false)}
              darkMode={isDarkMode}
            />

            {screen === 'home' && (
              <HomeScreen
                lang={lang}
                setLang={setLang}
                setIsVoiceOpen={setIsVoiceOpen}
                setScreen={setScreen}
                setTab={setActiveTab}
                isDarkMode={isDarkMode}
              />
            )}
            {screen === 'recommendations' && (
              <CropRecommendationScreen
                lang={lang}
                isDarkMode={isDarkMode}
                farmInfo={farmDetails}
                onSelectCrop={(crop) => {
                  setSelectedCrop(crop);
                  setScreen('crop-detail');
                }}
              />
            )}
            {screen === 'crop-detail' && (
              <CropDetailScreen
                crop={selectedCrop}
                onBack={() => setScreen('recommendations')}
                isDarkMode={isDarkMode}
              />
            )}
            {screen === 'community' && <CommunityScreen />}
            {screen === 'profile' && (
              <ProfileScreen
                darkMode={isDarkMode}
                toggleTheme={toggleTheme}
                farmDetails={farmDetails}
              />
            )}
            {screen === 'settings' && (
              <SettingsScreen
                darkMode={isDarkMode}
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
                toggleTheme={toggleTheme}
                lang={lang}
                setLang={setLang}
                onLogout={() => setOnboarding('landing')}
              />
            )}

            <BottomNav activeTab={activeTab} setTab={setActiveTab} setScreen={setScreen} />
          </div>
        )}
      </AnimatePresence>

      <VoiceModal isOpen={isVoiceOpen} onClose={() => setIsVoiceOpen(false)} />
    </div>
  );
}

export default App;
