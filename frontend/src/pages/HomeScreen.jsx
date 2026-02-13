import React from 'react';
import { motion as Motion } from 'framer-motion';
import { MapPin, Sun, Droplets, Wind, AlertTriangle, TrendingUp, Lightbulb } from 'lucide-react';
import MarketTicker from '../components/MarketTicker';
import '../styles/HomeScreen.css';

const HomeScreen = ({ setScreen, setTab, isDarkMode }) => {
    const [weather, setWeather] = React.useState(null);

    React.useEffect(() => {
        fetch('https://api.open-meteo.com/v1/forecast?latitude=18.52&longitude=73.85&current_weather=true')
            .then(res => res.json())
            .then(data => setWeather(data.current_weather))
            .catch(err => console.error("Weather fetch failed:", err));
    }, []);

    return (
        <>
            <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="app-shell home-shell" style={{ background: 'transparent' }}>
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

export default HomeScreen;
