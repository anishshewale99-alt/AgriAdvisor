import React, { useState } from 'react';
import {
  Home,
  Sprout,
  Users,
  User,
  Mic,
  Sun,
  Droplets,
  AlertTriangle,
  Lightbulb,
  ChevronRight,
  TrendingUp,
  Wind,
  MapPin,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import LandingScreen from './components/LandingScreen';
import FarmInfoScreen from './components/FarmInfoScreen';
import MarketTicker from './components/MarketTicker';
import VoiceModal from './components/VoiceModal';
import CommunityScreen from './components/CommunityScreen';
import ProfileScreen from './components/ProfileScreen';
import CropAnalysis from './components/CropAnalysis';

function App() {
  const [onboarding, setOnboarding] = useState('landing'); // landing, farm_info, finished
  const [activeTab, setActiveTab] = useState('home'); // home, crops, community, profile
  const [screen, setScreen] = useState('home'); // home, recommendations, wheat_detail
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [lang, setLang] = useState('mr'); // mr or en

  const BottomNav = () => (
    <div className="bottom-nav">
      <div className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
        onClick={() => { setActiveTab('home'); setScreen('home'); }}>
        <Home size={24} />
        <span>होम<br />Home</span>
      </div>
      <div className={`nav-item ${activeTab === 'crops' ? 'active' : ''}`}
        onClick={() => { setActiveTab('crops'); setScreen('recommendations'); }}>
        <Sprout size={24} />
        <span>पीके<br />Crops</span>
      </div>
      <div className={`nav-item ${activeTab === 'community' ? 'active' : ''}`}
        onClick={() => { setActiveTab('community'); setScreen('community'); }}>
        <Users size={24} />
        <span>समुदाय<br />Comm</span>
      </div>
      <div className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
        onClick={() => { setActiveTab('profile'); setScreen('profile'); }}>
        <User size={24} />
        <span>प्रोफाइल<br />Profile</span>
      </div>
    </div>
  );

  const HomeScreen = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="app-shell">
      <div className="top-bar">
        <span className="title" style={{ letterSpacing: '-0.5px' }}>CropAdvisor</span>
        <div className="right">
          <div className="lang" onClick={() => setLang(lang === 'mr' ? 'en' : 'mr')} style={{ cursor: 'pointer', background: lang === 'mr' ? 'var(--primary)' : 'white', color: lang === 'mr' ? 'white' : 'var(--text-main)', padding: '6px 12px', border: '1px solid #eee' }}>
            {lang === 'mr' ? 'मराठी' : 'English'}
          </div>
          <div onClick={() => setIsVoiceOpen(true)} style={{ cursor: 'pointer', background: 'white', padding: '8px', borderRadius: '50%', border: '1px solid #eee' }}>
            <Mic size={20} color="var(--primary)" />
          </div>
        </div>
      </div>

      <MarketTicker />

      <div className="season-chip">
        रबी हंगाम – फेब्रुवारी 2026 | Rabi Season - Feb 2026
      </div>

      <div className="weather-card">
        <div className="weather-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', opacity: 0.9 }}>
              <MapPin size={16} />
              <span style={{ fontSize: '0.875rem' }}>पुणे, महाराष्ट्र</span>
            </div>
            <div className="weather-temp">32°C</div>
            <div style={{ fontSize: '1rem', fontWeight: 600, marginTop: '4px' }}>स्वच्छ आकाश / Clear Sky</div>
          </div>
          <Sun size={64} color="#ffd54f" />
        </div>
        <div className="weather-stats">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Droplets size={16} />
            <span>आद्रता 45%</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Wind size={16} />
            <span>किमान 18°C</span>
          </div>
        </div>
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
          <div className="badge success" style={{ background: '#E8F5E9', color: '#2E7D32', padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
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

      <div style={{ margin: '0 20px 20px', padding: '20px', background: '#E8F5E9', borderRadius: '24px', display: 'flex', gap: '16px' }}>
        <div style={{ background: 'white', padding: '10px', borderRadius: '12px', alignSelf: 'flex-start', boxShadow: 'var(--shadow-premium)' }}>
          <Lightbulb size={24} color="var(--primary)" />
        </div>
        <div>
          <div className="marathi" style={{ marginBottom: '4px' }}>सेंद्रिय खतांचा वापर वाढवा आणि जमिनीचा पोत सुधारा.</div>
          <div className="english-sub">Increase the use of organic fertilizers to improve soil texture.</div>
        </div>
      </div>

      <button className="cta-btn" onClick={() => { setScreen('recommendations'); setActiveTab('crops'); }}>
        <div className="marathi" style={{ fontSize: '1.2rem' }}>पीक शिफारसी मिळवा 🌱</div>
        <div className="english-sub" style={{ color: 'rgba(255,255,255,0.8)' }}>Get Crop Recommendations</div>
      </button>

      <BottomNav />
    </motion.div>
  );

  const RecommendationsScreen = () => (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="app-shell" style={{ padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <div onClick={() => { setScreen('home'); setActiveTab('home'); }} style={{ background: 'white', padding: '8px', borderRadius: '12px', boxShadow: 'var(--shadow-premium)' }}>
          <ChevronRight size={24} style={{ transform: 'rotate(180deg)' }} />
        </div>
        <h2 className="marathi">तुमच्यासाठी टॉप पीक / Top Crops</h2>
      </div>

      {[
        { id: 1, name: 'गहू', en: 'Wheat', price: '₹2,400', match: 95, risk: 'Low', img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=400' },
        { id: 2, name: 'हरभरा', en: 'Gram', price: '₹5,200', match: 88, risk: 'Medium', img: 'https://images.unsplash.com/photo-1615485240383-cc906a59600a?auto=format&fit=crop&q=80&w=400' }
      ].map(crop => (
        <div key={crop.id} className="crop-list-card" onClick={() => crop.id === 1 && setScreen('wheat_detail')}>
          <div className="crop-img-container" style={{ backgroundImage: `url(${crop.img})` }}>
            <div className="rank-badge">#{crop.id} Top Choice</div>
          </div>
          <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div className="marathi" style={{ fontSize: '1.25rem' }}>{crop.name} • {crop.en}</div>
                <div style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '1.1rem', marginTop: '4px' }}>{crop.price} <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>/ qtl</span></div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 800, color: 'var(--primary)' }}>{crop.match}% Match</div>
                <div style={{ fontSize: '0.75rem', color: 'white', background: crop.risk === 'Low' ? 'var(--primary)' : 'var(--accent-orange)', padding: '2px 8px', borderRadius: '4px', marginTop: '4px' }}>{crop.risk} Risk</div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <BottomNav />
    </motion.div>
  );

  const DetailScreen = () => (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="app-shell">
      <div className="detail-header" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=600)' }}>
        <div onClick={() => setScreen('recommendations')} style={{ position: 'absolute', top: 20, left: 20, background: 'rgba(255,255,255,0.8)', padding: '10px', borderRadius: '12px' }}>
          <ChevronRight size={24} style={{ transform: 'rotate(180deg)' }} />
        </div>
      </div>
      <div className="price-card" style={{ borderRadius: 'var(--radius-lg)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div><h1 className="marathi">गहू • Wheat</h1><div className="msp-badge" style={{ background: '#E8F5E9', color: 'var(--primary-dark)' }}>MSP ₹2,275</div></div>
          <div style={{ textAlign: 'right' }}><div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>₹2,400</div><div className="english-sub">Today's Price</div></div>
        </div>
        <div style={{ padding: '16px', background: 'var(--bg-field)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between' }}>
          <div><div className="english-sub">Expected Profit/Acre</div><div style={{ fontWeight: 800, color: 'var(--primary-dark)' }}>₹15,000 - ₹20,000</div></div>
          <TrendingUp size={24} color="var(--primary)" />
        </div>
      </div>
      <div style={{ padding: '0 20px 20px' }}>
        <h3 className="marathi" style={{ marginBottom: '16px' }}>जोखीम विश्लेषण / Risk Analysis</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[{ label: 'हवामान जोखीम / Weather', val: 'Low', perc: 20, color: 'var(--primary)' }, { label: 'बाजार जोखीम / Market', val: 'Med', perc: 45, color: 'var(--accent-yellow)' }].map((r, i) => (
            <div key={i}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: 600, marginBottom: '6px' }}><span>{r.label}</span><span style={{ color: r.color }}>{r.val}</span></div>
              <div className="progress-bar-container"><div className="progress-bar" style={{ width: `${r.perc}%`, background: r.color }}></div></div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 20px 40px' }}>
        <h3 className="marathi" style={{ marginBottom: '16px' }}>पीक विश्लेषण / Crop Analysis</h3>
        <CropAnalysis />
      </div>
      <BottomNav />
    </motion.div>
  );

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {onboarding === 'landing' && (
          <LandingScreen key="landing" onNext={() => setOnboarding('farm_info')} />
        )}
        {onboarding === 'farm_info' && (
          <FarmInfoScreen key="farm_info" onNext={() => setOnboarding('finished')} />
        )}

        {onboarding === 'finished' && (
          <>
            {screen === 'home' && <HomeScreen key="home" />}
            {screen === 'recommendations' && <RecommendationsScreen key="recs" />}
            {screen === 'wheat_detail' && <DetailScreen key="detail" />}
            {screen === 'community' && <CommunityScreen key="comm" />}
            {screen === 'profile' && <ProfileScreen key="prof" />}
          </>
        )}
      </AnimatePresence>

      <VoiceModal isOpen={isVoiceOpen} onClose={() => setIsVoiceOpen(false)} />
    </div>
  );
}

export default App;
