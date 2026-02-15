import React from 'react';
import {
    Sun,
    Thermometer,
    CloudRain,
    Cloud,
    Calendar,
    TrendingUp,
    Droplets,
    Wind,
    AlertTriangle,
    ChevronLeft,
    ChevronDown
} from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import '../styles/CropDetailScreen.css';

const IconMap = {
    Sun: Sun,
    Thermometer: Thermometer,
    CloudRain: CloudRain,
    Cloud: Cloud,
};

const CropDetailScreen = ({ crop, onBack, isDarkMode, lang }) => {
    const [isExpanded, setIsExpanded] = React.useState(false);
    if (!crop) return null;
    const isEn = lang === 'en';

    return (
        <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            style={{
                width: '100%',
                margin: '0 auto',
                paddingBottom: '40px'
            }}
        >
            {/* Header Banner */}
            <div style={{
                height: '240px',
                background: '#15803D',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '24px',
                color: 'white'
            }}>
                {/* Fixed Back Button */}
                <div
                    onClick={onBack}
                    style={{
                        position: 'absolute',
                        top: '16px',
                        left: '16px',
                        background: 'rgba(0,0,0,0.2)',
                        padding: '8px',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        backdropFilter: 'blur(4px)'
                    }}
                >
                    <ChevronLeft size={24} color="white" />
                </div>

                <div className="marathi" style={{
                    fontSize: crop.id === 'onion' ? '2rem' : '2.5rem',
                    fontWeight: 800,
                    textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                    textAlign: crop.id === 'onion' ? 'left' : 'center'
                }}>
                    {isEn ? crop.englishName : crop.marathiName}
                </div>
                <div style={{
                    fontSize: '1rem',
                    opacity: 0.9,
                    textAlign: crop.id === 'onion' ? 'left' : 'center'
                }}>
                    {isEn ? crop.marathiName : crop.englishName} {crop.id === 'onion' ? `• ${crop.calendar.duration}` : ''}
                </div>
            </div>

            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '-30px' }}>

                {/* Analysis Summary Layout */}
                <div style={{
                    background: isDarkMode ? '#1f2937' : 'white',
                    borderRadius: '24px',
                    padding: '24px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
                    border: isDarkMode ? '1px solid #374151' : '1px solid #f0f0f0',
                    display: 'flex',
                    flexDirection: isDarkMode ? 'column' : 'column',
                    gap: '24px',
                    position: 'relative',
                    zIndex: 10
                }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                        gap: '20px'
                    }}>
                        {/* Demand Metric */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                                background: 'rgba(46, 125, 50, 0.1)',
                                padding: '10px',
                                borderRadius: '12px',
                                color: 'var(--primary)'
                            }}>
                                <TrendingUp size={20} />
                            </div>
                            <div>
                                <div className="english-sub" style={{ fontSize: '0.7rem', color: isDarkMode ? '#9ca3af' : 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                                    {isEn ? 'Demand' : 'मागणी'}
                                </div>
                                <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{crop.matchScore}%</div>
                            </div>
                        </div>

                        {/* Market Price Metric */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                                background: 'rgba(255, 193, 7, 0.1)',
                                padding: '10px',
                                borderRadius: '12px',
                                color: '#d97706'
                            }}>
                                <TrendingUp size={20} />
                            </div>
                            <div>
                                <div className="english-sub" style={{ fontSize: '0.7rem', color: isDarkMode ? '#9ca3af' : 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                                    {isEn ? 'Market Strength' : 'बाजार मजबुती'}
                                </div>
                                <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{crop.tags.includes('High Demand') ? 'High' : (crop.matchScore > 85 ? 'Strong' : 'Stable')}</div>
                            </div>
                        </div>

                        {/* Risk Level Metric */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                                background: 'rgba(239, 68, 68, 0.1)',
                                padding: '10px',
                                borderRadius: '12px',
                                color: '#ef4444'
                            }}>
                                <AlertTriangle size={20} />
                            </div>
                            <div>
                                <div className="english-sub" style={{ fontSize: '0.7rem', color: isDarkMode ? '#9ca3af' : 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                                    {isEn ? 'Risk Level' : 'जोखीम पातळी'}
                                </div>
                                <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>
                                    {isEn ? crop.risks.weather.level : (crop.risks.weather.level === 'Low' ? 'कमी' : crop.risks.weather.level === 'Medium' ? 'मध्यम' : 'जास्त')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* "Why This Crop?" Section */}
                <div style={{
                    background: isDarkMode ? '#1f2937' : 'white',
                    borderRadius: '24px',
                    padding: '20px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
                    border: isDarkMode ? '1px solid #374151' : '1px solid #f0f0f0'
                }}>
                    <div
                        onClick={() => setIsExpanded(!isExpanded)}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            cursor: 'pointer'
                        }}
                    >
                        <h3 className="marathi" style={{ fontSize: '1.1rem', color: isDarkMode ? '#fff' : 'var(--primary-dark)' }}>
                            {isEn ? 'Why This Crop?' : 'हेच पीक का?'}
                        </h3>
                        <Motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                            <ChevronDown size={20} color={isDarkMode ? '#9ca3af' : '#6b7280'} />
                        </Motion.div>
                    </div>

                    <AnimatePresence>
                        {isExpanded && (
                            <Motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                style={{ overflow: 'hidden' }}
                            >
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
                                    {[
                                        { en: `Perfect for ${crop.season.join(', ')}`, mr: `${crop.season.join(', ')} हंगामासाठी योग्य` },
                                        { en: `${crop.matchScore > 85 ? 'High' : 'Stable'} Market Demand`, mr: `बाजारात ${crop.matchScore > 85 ? 'मोठी' : 'स्थिर'} मागणी` },
                                        { en: `${crop.risks.weather.level} Risk Profile`, mr: `${crop.risks.weather.level === 'Low' ? 'कमी' : crop.risks.weather.level === 'Medium' ? 'मध्यम' : 'जास्त'} जोखीम पातळी` },
                                        { en: `Compatible with ${crop.soil.join(', ')} Soil`, mr: `${crop.soil.join(', ')} मातीसाठी योग्य` },
                                        { en: `${crop.waterReq} Water Requirement`, mr: `${crop.waterReq === 'Low' ? 'कमी' : crop.waterReq === 'Medium' ? 'मध्यम' : 'जास्त'} पाणी गरज` },
                                        { en: 'Government MSP Support', mr: 'शासकीय हमीभाव आधार' }
                                    ].map((reason, idx) => (
                                        <div
                                            key={idx}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '12px',
                                                padding: '12px 16px',
                                                background: isDarkMode ? '#111827' : '#F0F9FF',
                                                borderRadius: '16px',
                                                border: isDarkMode ? '1px solid #374151' : '1px solid #E0F2FE'
                                            }}
                                        >
                                            <div style={{
                                                width: '20px',
                                                height: '20px',
                                                borderRadius: '50%',
                                                background: 'var(--primary)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexShrink: 0
                                            }}>
                                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                    <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                            <span className="marathi" style={{ fontSize: '0.9rem', color: isDarkMode ? '#e2e8f0' : '#0369a1', fontWeight: 600 }}>
                                                {isEn ? reason.en : reason.mr}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </Motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Crop Calendar Section */}
                <div style={{
                    background: isDarkMode ? '#1f2937' : 'white',
                    borderRadius: '24px',
                    padding: '24px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
                    border: isDarkMode ? '1px solid #374151' : '1px solid #f0f0f0'
                }}>
                    <h3 className="marathi" style={{ fontSize: '1.1rem', marginBottom: '20px', color: isDarkMode ? '#fff' : 'var(--primary-dark)' }}>
                        {isEn ? 'Crop Calendar' : 'पीक कालावधी'}
                    </h3>
                    <div style={{ position: 'relative', padding: '10px 0 30px' }}>
                        <div style={{ height: '12px', background: isDarkMode ? '#374151' : '#f1f3f4', borderRadius: '10px', width: '100%' }} />
                        <div style={{
                            position: 'absolute',
                            top: '10px',
                            left: '10%',
                            right: '10%',
                            height: '12px',
                            background: 'var(--primary)',
                            borderRadius: '10px',
                            boxShadow: '0 0 10px rgba(46, 125, 50, 0.3)'
                        }} />
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: '12px', padding: '0 5%' }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>{crop.calendar.start}</div>
                                <div style={{ fontSize: '0.65rem', opacity: 0.7 }}>{isEn ? 'Planting' : 'पेरणी'}</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>{crop.calendar.end}</div>
                                <div style={{ fontSize: '0.65rem', opacity: 0.7 }}>{isEn ? 'Harvest' : 'काढणी'}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 30-Day Outlook Section */}
                <div style={{
                    background: isDarkMode ? '#1f2937' : 'white',
                    borderRadius: '24px',
                    padding: '24px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
                    border: isDarkMode ? '1px solid #374151' : '1px solid #f0f0f0'
                }}>
                    <h3 className="marathi" style={{ fontSize: '1.1rem', marginBottom: '20px', color: isDarkMode ? '#fff' : 'var(--primary-dark)' }}>
                        {isEn ? '30-Day Outlook' : '30-दिवस दृष्टिकोन'}
                    </h3>
                    <div style={{
                        display: 'flex',
                        gap: '12px',
                        overflowX: 'auto',
                        paddingBottom: '10px',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                    }}>
                        {crop.outlook.map((week, idx) => {
                            const WeekIcon = IconMap[week.icon] || Sun;
                            return (
                                <div key={idx} style={{
                                    minWidth: '100px',
                                    background: isDarkMode ? '#111827' : '#f9fafb',
                                    padding: '16px 12px',
                                    borderRadius: '20px',
                                    textAlign: 'center',
                                    border: isDarkMode ? '1px solid #374151' : '1px solid #f0f0f0'
                                }}>
                                    <div style={{ fontSize: '0.75rem', fontWeight: 600, opacity: 0.7, marginBottom: '8px' }}>
                                        {isEn ? week.week : week.week.replace('W', 'आठवडा ')}
                                    </div>
                                    <div style={{
                                        background: 'white',
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 8px',
                                        boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
                                        color: '#f59e0b'
                                    }}>
                                        <WeekIcon size={24} />
                                    </div>
                                    <div className="marathi" style={{ fontSize: '0.75rem', fontWeight: 700 }}>
                                        {isEn ? week.status : (week.status === 'Clear' ? 'स्वच्छ' : week.status === 'Cloudy' ? 'ढगाळ' : week.status)}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </Motion.div>
    );
};

export default CropDetailScreen;
