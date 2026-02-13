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

import LandingScreen from './pages/LandingScreen';
import FarmInfoScreen from './pages/FarmInfoScreen';
import HomeScreen from './pages/HomeScreen';
import MarketTicker from './components/MarketTicker';
import VoiceModal from './components/VoiceModal';
import CommunityScreen from './pages/CommunityScreen';
import ProfileScreen from './pages/ProfileScreen';
import SettingsScreen from './pages/SettingsScreen';
import SideMenu from './components/SideMenu';
import CropAnalysis from './components/CropAnalysis';
import CropRecommendationScreen from './pages/CropRecommendationScreen';
import CropDetailScreen from './pages/CropDetailScreen';
import DesktopSidebar from './components/DesktopSidebar';
import MainHeader from './components/MainHeader';
import LightBg from './assets/light.png';
import DarkBg from './assets/bg2.png';
import FarmPattern from './assets/image.png';

const BottomNav = ({ activeTab, setTab, setScreen }) => (
  <div className="bottom-nav" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
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


// Replaced by CropRecommendationScreen.jsx component

// Replaced by CropDetailScreen.jsx component

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
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  React.useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
          <LandingScreen key="landing" onNext={() => setOnboarding('farm_info')} isDesktop={isDesktop} />
        )}
        {onboarding === 'farm_info' && (
          <FarmInfoScreen
            key="farm_info"
            farmInfo={farmDetails}
            setFarmInfo={setFarmDetails}
            isDesktop={isDesktop}
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
            className={`${isDesktop ? 'desktop-layout' : ''}`}
            style={{
              display: isDesktop ? 'flex' : 'flex',
              flexDirection: isDesktop ? 'row' : 'column',
              alignItems: 'center',
              width: '100%',
              minHeight: '100vh',
            }}
          >
            {isDesktop && (
              <DesktopSidebar
                activeTab={activeTab}
                setTab={setActiveTab}
                setScreen={setScreen}
                isDarkMode={isDarkMode}
                toggleTheme={toggleTheme}
                lang={lang}
                setLang={setLang}
                onLogout={() => setOnboarding('landing')}
              />
            )}

            <div className={isDesktop ? "main-content-desktop" : "mobile-content-wrapper"} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                isDesktop={isDesktop}
                isDarkMode={isDarkMode}
              />

              {!isDesktop && (
                <SideMenu
                  isOpen={isMenuOpen}
                  onClose={() => setIsMenuOpen(false)}
                  darkMode={isDarkMode}
                />
              )}

              <div className="content-card">
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
                    isDesktop={isDesktop}
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
                {screen === 'community' && <CommunityScreen isDarkMode={isDarkMode} />}
                {screen === 'profile' && (
                  <ProfileScreen
                    darkMode={isDarkMode}
                    isDesktop={isDesktop}
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
                    isDesktop={isDesktop}
                    onLogout={() => setOnboarding('landing')}
                  />
                )}
              </div>

              {!isDesktop && <BottomNav activeTab={activeTab} setTab={setActiveTab} setScreen={setScreen} />}
            </div>
          </div>
        )}
      </AnimatePresence>

      <VoiceModal isOpen={isVoiceOpen} onClose={() => setIsVoiceOpen(false)} />
    </div>
  );
}

export default App;
