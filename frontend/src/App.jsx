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
  Settings,
  ChevronDown
} from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './context/LanguageContext';

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
// Image imports removed for clean solid background layout

const BottomNav = ({ activeTab, setTab, setScreen }) => {
  const { isEnglish } = useLanguage(); // Use global language context
  const lang = isEnglish ? 'en' : 'mr'; // For backward compatibility

  return (
    <div className="bottom-nav" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
        <div className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => { setTab('home'); setScreen('home'); }}>
          <Home size={22} />
          <span className="marathi">{lang === 'en' ? 'Home' : 'होम'}</span>
        </div>
        <div className={`nav-item ${activeTab === 'crops' ? 'active' : ''}`}
          onClick={() => { setTab('crops'); setScreen('recommendations'); }}>
          <Sprout size={22} />
          <span className="marathi">{lang === 'en' ? 'Crops' : 'पीके'}</span>
        </div>
        <div className={`nav-item ${activeTab === 'community' ? 'active' : ''}`}
          onClick={() => { setTab('community'); setScreen('community'); }}>
          <Users size={22} />
          <span className="marathi">{lang === 'en' ? 'Community' : 'समुदाय'}</span>
        </div>
        <div className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => { setTab('settings'); setScreen('settings'); }}>
          <Settings size={22} />
          <span className="marathi">{lang === 'en' ? 'Settings' : 'सेटिंग्ज'}</span>
        </div>
      </div>
    </div>
  );
};


// Replaced by CropRecommendationScreen.jsx component

// Replaced by CropDetailScreen.jsx component

// Loading Screen Component
const LoadingScreen = ({ lang, isDarkMode, onFinished }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const isEn = lang === 'en';

  const steps = [
    { en: 'Fetching mandi prices', mr: 'मंडी भाव मिळवत आहे' },
    { en: 'Checking IMD weather data', mr: 'IMD हवामान डेटा तपासत आहे' },
    { en: 'Analyzing risks and demand', mr: 'जोखीम आणि मागणीचे विश्लेषण' },
    { en: 'Preparing recommendations', mr: 'शिफारसी तयार करत आहे' }
  ];

  React.useEffect(() => {
    if (currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      const finishTimer = setTimeout(() => {
        onFinished();
      }, 500);
      return () => clearTimeout(finishTimer);
    }
  }, [currentStep, onFinished]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      padding: '40px 20px',
      textAlign: 'center'
    }}>
      <Motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          background: 'rgba(46, 125, 50, 0.1)',
          padding: '24px',
          borderRadius: '50%',
          marginBottom: '24px'
        }}
      >
        <Sprout size={64} color="var(--primary)" />
      </Motion.div>

      <h2 className="marathi" style={{
        fontSize: '1.75rem',
        marginBottom: '32px',
        color: isDarkMode ? 'white' : 'var(--primary-dark)'
      }}>
        {isEn ? 'Analyzing Your Farm...' : 'तुमच्या शेताचे विश्लेषण करत आहे...'}
      </h2>

      <div style={{
        width: '100%',
        maxWidth: '320px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        textAlign: 'left'
      }}>
        {steps.map((step, idx) => {
          const isCompleted = idx < currentStep;
          const isActive = idx === currentStep;

          return (
            <Motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: isCompleted || isActive ? (isDarkMode ? '#fff' : '#1f2937') : (isDarkMode ? '#4b5563' : '#9ca3af'),
                fontWeight: isActive ? 700 : 500
              }}
            >
              <div style={{
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {isCompleted ? (
                  <Motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: '#16a34a',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </Motion.div>
                ) : isActive ? (
                  <Motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    style={{
                      width: '18px',
                      height: '18px',
                      border: `2px solid ${isDarkMode ? '#fff' : 'var(--primary)'}`,
                      borderTopColor: 'transparent',
                      borderRadius: '50%'
                    }}
                  />
                ) : (
                  <div style={{
                    width: '18px',
                    height: '18px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '50%'
                  }} />
                )}
              </div>
              <span className="marathi">{isEn ? step.en : step.mr}</span>
            </Motion.div>
          );
        })}
      </div>
    </div>
  );
};

function App() {
  const [onboarding, setOnboarding] = useState('landing');
  const [activeTab, setActiveTab] = useState('home');
  const [screen, setScreen] = useState('home');
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [lang, setLang] = useState('mr');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [farmDetails, setFarmDetails] = useState({});
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [previousCropScreen, setPreviousCropScreen] = useState('recommendations');

  React.useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  // Background Logic removed as per request to have solid backgrounds only

  const handleTTS = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(lang === 'mr' ? 'ॲग्री ॲडव्हायझरमध्ये आपले स्वागत आहे. सध्या रबी हंगाम आहे.' : 'Welcome to AgriAdvisor. It is currently Rabi Season.');
    utterance.lang = lang === 'mr' ? 'mr-IN' : 'en-US';
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div
      className={`${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} w-full min-h-screen`}
      style={{
        background: isDarkMode ? '#0f172a' : '#f8fafc',
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
              setScreen('loading');
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
              alignItems: isDesktop ? 'stretch' : 'center',
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

            <div
              className={isDesktop ? "main-content-desktop" : "mobile-content-wrapper"}
              style={{
                flex: isDesktop ? 1 : 'unset',
                width: isDesktop ? 'auto' : '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: isDesktop ? '100px' : '84px' // Account for fixed header
              }}
            >
              <MainHeader
                screen={screen}
                setScreen={setScreen}
                setTab={setActiveTab}
                lang={lang}
                setLang={setLang}
                setIsMenuOpen={setIsMenuOpen}
                handleTTS={handleTTS}
                isSpeaking={isSpeaking}
                isDesktop={isDesktop}
                isDarkMode={isDarkMode}
                previousCropScreen={previousCropScreen}
              />

              {!isDesktop && (
                <SideMenu
                  isOpen={isMenuOpen}
                  onClose={() => setIsMenuOpen(false)}
                  darkMode={isDarkMode}
                  setScreen={setScreen}
                  setTab={setActiveTab}
                />
              )}

              <div className="content-card">
                {screen === 'home' && (
                  <HomeScreen
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
                    showAll={false}
                    setScreen={setScreen}
                    onSelectCrop={(crop) => {
                      setSelectedCrop(crop);
                      setPreviousCropScreen('recommendations');
                      setScreen('crop-detail');
                    }}
                  />
                )}
                {screen === 'loading' && (
                  <LoadingScreen
                    lang={lang}
                    isDarkMode={isDarkMode}
                    onFinished={() => {
                      setScreen('recommendations');
                      setActiveTab('crops');
                    }}
                  />
                )}
                {screen === 'all-crops' && (
                  <CropRecommendationScreen
                    lang={lang}
                    isDarkMode={isDarkMode}
                    isDesktop={isDesktop}
                    farmInfo={farmDetails}
                    showAll={true}
                    setScreen={setScreen}
                    onSelectCrop={(crop) => {
                      setSelectedCrop(crop);
                      setPreviousCropScreen('all-crops');
                      setScreen('crop-detail');
                    }}
                  />
                )}
                {screen === 'crop-detail' && (
                  <CropDetailScreen
                    crop={selectedCrop}
                    onBack={() => setScreen(previousCropScreen)}
                    isDarkMode={isDarkMode}
                    lang={lang}
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
