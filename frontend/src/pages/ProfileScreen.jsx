import React, { useState } from 'react';
import { User, Sprout, Droplets, CloudRain, Tractor, Edit2 } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import '../styles/ProfileScreen.css';

const ProfileScreen = ({ darkMode, farmDetails, isDesktop }) => {
    const { isEnglish, toggleLanguage } = useLanguage(); // Use global language context

    // Fallback data if farmDetails is missing
    const details = farmDetails || {};

    return (
        <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
                width: '100%',
                margin: '0 auto',
                padding: '20px',
                paddingBottom: '100px',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                background: 'transparent'
            }}
        >
            <div style={{
                background: darkMode ? '#111827' : 'white',
                borderRadius: '24px',
                padding: '20px',
                boxShadow: darkMode ? '0 10px 40px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                color: darkMode ? '#f3f4f6' : '#111827'
            }}>
                {/* Top Card */}
                <div style={{
                    width: '100%',
                    background: darkMode ? 'rgba(27, 46, 33, 0.95)' : 'var(--primary-dark)',
                    padding: '40px 24px 30px',
                    borderRadius: '32px',
                    color: 'white',
                    textAlign: 'center',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    position: 'relative'
                }}>
                    {/* Language Toggle - only on mobile */}
                    {!isDesktop && (
                        <div
                            onClick={toggleLanguage}
                            style={{
                                position: 'absolute',
                                top: '20px',
                                right: '20px',
                                background: 'rgba(255, 255, 255, 0.2)',
                                backdropFilter: 'blur(10px)',
                                padding: '4px',
                                borderRadius: '100px',
                                display: 'flex',
                                cursor: 'pointer',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                zIndex: 10
                            }}
                        >
                            <div style={{
                                padding: '6px 12px',
                                borderRadius: '100px',
                                fontSize: '0.75rem',
                                fontWeight: '700',
                                background: !isEnglish ? 'white' : 'transparent',
                                color: !isEnglish ? '#166534' : 'rgba(255,255,255,0.8)',
                                transition: 'all 0.2s ease'
                            }}>
                                MR
                            </div>
                            <div style={{
                                padding: '6px 12px',
                                borderRadius: '100px',
                                fontSize: '0.75rem',
                                fontWeight: '700',
                                background: isEnglish ? 'white' : 'transparent',
                                color: isEnglish ? '#166534' : 'rgba(255,255,255,0.8)',
                                transition: 'all 0.2s ease'
                            }}>
                                EN
                            </div>
                        </div>
                    )}

                    <div style={{
                        width: '80px',
                        height: '80px',
                        background: 'rgba(255,255,255,0.2)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px',
                        border: '2px solid rgba(255,255,255,0.3)'
                    }}>
                        <User size={40} color="white" />
                    </div>
                    <h2 className="marathi" style={{ fontSize: '1.75rem', marginBottom: '4px' }}>
                        {isEnglish ? 'Guest Farmer' : 'Guest शेतकरी'}
                    </h2>
                    <p style={{ fontSize: '1rem', opacity: 0.9, marginBottom: '24px' }}>
                        {isEnglish ? `Pune, Maharashtra • ${details.acres || '0'} Acres` : `पुणे, महाराष्ट्र • ${details.acres || '0'} एकर`}
                    </p>

                    {/* Stats Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '12px',
                        width: '100%'
                    }}>
                        {[
                            {
                                val: isEnglish
                                    ? (details.acres ? details.acres + ' Acres' : 'Size Not Set')
                                    : (details.acres ? details.acres + ' एकर' : 'आकार सेट नाही'),
                                sub: isEnglish ? 'Farm Size' : 'शेत आकार'
                            },
                            {
                                val: details.season || (isEnglish ? 'Season Not Set' : 'हंगाम सेट नाही'),
                                sub: isEnglish ? 'Season' : 'हंगाम'
                            },
                            {
                                val: isEnglish ? '3 Crops' : '3 पिके',
                                sub: isEnglish ? 'Crops' : 'पिके'
                            }
                        ].map((stat, i) => (
                            <div key={i} style={{
                                background: 'rgba(255,255,255,0.15)',
                                padding: '16px 8px',
                                borderRadius: '20px',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <div className="marathi" style={{ fontSize: '0.9rem', fontWeight: 800, textAlign: 'center' }}>{stat.val}</div>
                                <div style={{ fontSize: '0.65rem', opacity: 0.9, fontWeight: 600, marginTop: '4px' }}>{stat.sub}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Farm Details Section */}
                <div>
                    <h3 className="marathi" style={{
                        fontSize: '1.25rem',
                        fontWeight: '700',
                        marginBottom: '16px',
                        color: darkMode ? 'white' : '#1f2937',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        {isEnglish ? 'Farm Details' : 'माझी शेती'}
                        <span style={{ fontSize: '0.9rem', fontWeight: '400', color: '#6b7280' }}>
                            {isEnglish ? '(My Farm)' : '(Farm Details)'}
                        </span>
                    </h3>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '16px'
                    }}>
                        {[
                            {
                                icon: Sprout,
                                title: isEnglish ? 'Soil Type' : 'माती प्रकार',
                                value: details.soil || (isEnglish ? 'Not Set' : 'सेट नाही')
                            },
                            {
                                icon: Droplets,
                                title: isEnglish ? 'Water Source' : 'पाण्याचा स्रोत',
                                value: details.waterSource || (isEnglish ? 'Not Set' : 'सेट नाही')
                            },
                            // Irrigation removed
                            {
                                icon: Tractor,
                                title: isEnglish ? 'Machinery' : 'यंत्रसामग्री',
                                value: details.machinery || (isEnglish ? 'Not Set' : 'सेट नाही')
                            }
                        ].map((item, i) => (
                            <div key={i} style={{
                                background: darkMode ? '#1f2937' : 'white',
                                borderRadius: '20px',
                                padding: '16px',
                                boxShadow: darkMode ? 'none' : '0 4px 12px rgba(0,0,0,0.05)',
                                border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #f0f0f0',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '12px'
                            }}>
                                <div style={{
                                    background: 'rgba(22, 163, 74, 0.1)',
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <item.icon size={20} color="#16a34a" />
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: darkMode ? '#9ca3af' : '#6b7280', marginBottom: '4px' }}>{item.title}</div>
                                    <div className="marathi" style={{ fontSize: '0.9rem', fontWeight: '600', color: darkMode ? 'white' : '#111827' }}>{item.value}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Saved Crops Section */}
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h3 className="marathi" style={{
                            fontSize: '1.25rem',
                            fontWeight: '700',
                            color: darkMode ? 'white' : '#1f2937'
                        }}>
                            {isEnglish ? 'My Watchlist' : 'जतन केलेली पिके'}
                        </h3>
                        <span style={{ fontSize: '0.85rem', color: '#16a34a', fontWeight: '600' }}>
                            {isEnglish ? 'View All' : 'My Watchlist'}
                        </span>
                    </div>

                    <div style={{
                        display: 'flex',
                        overflowX: 'auto',
                        gap: '12px',
                        paddingBottom: '8px',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                    }}>
                        {[
                            { name: isEnglish ? 'Wheat' : 'गहू', price: '₹2,125/Q', bg: '#fef3c7' },
                            { name: isEnglish ? 'Onion' : 'कांदा', price: '₹1,450/Q', bg: '#fee2e2' },
                            { name: isEnglish ? 'Soybean' : 'सोयाबीन', price: '₹4,800/Q', bg: '#dcfce7' },
                            { name: isEnglish ? 'Cotton' : 'कापूस', price: '₹6,900/Q', bg: '#e0f2fe' }
                        ].map((crop, i) => (
                            <div key={i} style={{
                                minWidth: '140px',
                                background: darkMode ? '#1f2937' : 'white',
                                borderRadius: '16px',
                                padding: '12px',
                                border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #f0f0f0',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '8px',
                                flexShrink: 0
                            }}>
                                <div style={{
                                    width: '100%',
                                    height: '80px',
                                    background: crop.bg,
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '2rem'
                                }}>
                                    {/* Placeholder for crop image */}
                                    🌱
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: '600', color: darkMode ? 'white' : '#111827', marginBottom: '2px' }}>{crop.name}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: '600' }}>{crop.price}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action Button */}
                <button style={{
                    width: '100%',
                    padding: '16px',
                    background: '#16a34a',
                    color: 'white',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(22, 163, 74, 0.2)'
                }}>
                    <Edit2 size={20} />
                    {isEnglish ? 'Edit Profile' : 'माहिती बदला'}
                </button>
            </div>
        </Motion.div >
    );
};

export default ProfileScreen;
