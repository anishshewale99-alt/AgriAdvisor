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
    ChevronLeft
} from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import '../styles/CropDetailScreen.css';

const IconMap = {
    Sun: Sun,
    Thermometer: Thermometer,
    CloudRain: CloudRain,
    Cloud: Cloud,
};

const CropDetailScreen = ({ crop, onBack, isDarkMode }) => {
    if (!crop) return null;

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
                background: crop.id === 'onion'
                    ? `linear-gradient(to bottom, transparent, rgba(0,0,0,0.7)), url(${crop.image})`
                    : '#15803D',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: crop.id === 'onion' ? 'flex-end' : 'center',
                alignItems: crop.id === 'onion' ? 'flex-start' : 'center',
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
                    {crop.marathiName}
                </div>
                <div style={{
                    fontSize: '1rem',
                    opacity: 0.9,
                    textAlign: crop.id === 'onion' ? 'left' : 'center'
                }}>
                    {crop.englishName} {crop.id === 'onion' ? `• ${crop.calendar.duration}` : ''}
                </div>
            </div>

            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '-30px' }}>

                {/* Price & Profit Card */}
                <div style={{
                    background: isDarkMode ? '#1f2937' : 'white',
                    borderRadius: '24px',
                    padding: '20px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
                    border: isDarkMode ? '1px solid #374151' : '1px solid #f0f0f0',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '16px',
                    position: 'relative',
                    zIndex: 10
                }}>
                    <div>
                        <div className="english-sub" style={{ fontSize: '0.7rem', color: isDarkMode ? '#9ca3af' : 'var(--text-muted)' }}>MKT PRICE / बाजार भाव</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}>{crop.price.split('/')[0]}</div>
                        <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>per {crop.price.split('/')[1]}</div>
                    </div>
                    <div style={{ borderLeft: isDarkMode ? '1px solid #374151' : '1px solid #f0f0f0', paddingLeft: '16px' }}>
                        <div className="english-sub" style={{ fontSize: '0.7rem', color: isDarkMode ? '#9ca3af' : 'var(--text-muted)' }}>EXP PROFIT / नफा</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}>{crop.profit}</div>
                        <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>{crop.profitPer}</div>
                    </div>
                </div>

                {/* Risk Analysis Section */}
                <div style={{
                    background: isDarkMode ? '#1f2937' : 'white',
                    borderRadius: '24px',
                    padding: '24px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
                    border: isDarkMode ? '1px solid #374151' : '1px solid #f0f0f0'
                }}>
                    <h3 className="marathi" style={{ fontSize: '1.1rem', marginBottom: '20px', color: isDarkMode ? '#fff' : 'var(--primary-dark)' }}>
                        जोखीम विश्लेषण / Risk Analysis
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {Object.entries(crop.risks).map(([key, risk]) => {
                            const colorMap = {
                                weather: '#4CAF50',
                                market: '#FFC107',
                                water: '#2196F3'
                            };
                            const iconMap = {
                                weather: Wind,
                                market: TrendingUp,
                                water: Droplets
                            };
                            const Icon = iconMap[key];

                            return (
                                <div key={key}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <Icon size={16} color={colorMap[key]} />
                                            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: isDarkMode ? '#e5e7eb' : '#374151' }}>{risk.label}</span>
                                        </div>
                                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: colorMap[key] }}>{risk.level}</span>
                                    </div>
                                    <div style={{ height: '8px', background: isDarkMode ? '#374151' : '#f1f3f4', borderRadius: '4px', overflow: 'hidden' }}>
                                        <div style={{ width: `${risk.value}%`, height: '100%', background: colorMap[key], borderRadius: '4px' }} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
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
                        पीक कालावधी / Crop Calendar
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
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', padding: '0 5%' }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>{crop.calendar.start}</div>
                                <div style={{ fontSize: '0.65rem', opacity: 0.7 }}>Planting</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>{crop.calendar.end}</div>
                                <div style={{ fontSize: '0.65rem', opacity: 0.7 }}>Harvest</div>
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
                        30-दिवस दृष्टिकोन / 30-Day Outlook
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
                                    <div style={{ fontSize: '0.75rem', fontWeight: 600, opacity: 0.7, marginBottom: '8px' }}>{week.week}</div>
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
                                    <div className="marathi" style={{ fontSize: '0.75rem', fontWeight: 700 }}>{week.status}</div>
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
