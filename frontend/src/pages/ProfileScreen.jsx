import React from 'react';
import { User as UserIcon, Sprout, Droplets, Tractor, Mail, MapPin, Edit2 } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import '../styles/ProfileScreen.css';

const ProfileScreen = ({ darkMode, isDesktop, onEdit }) => {
    const { isEnglish, toggleLanguage } = useLanguage();
    const { user, logout } = useAuth();

    // Fallback data if farmDetails is missing
    const farm = user?.farmInfo || {};

    return (
        <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '100px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px',
                        border: '2px solid rgba(255,255,255,0.3)',
                        overflow: 'hidden'
                    }}>
                        {user?.picture ? (
                            <img src={user.picture} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                            <UserIcon size={40} color="white" />
                        )}
                    </div>
                    <h2 className="marathi" style={{ fontSize: '1.75rem', marginBottom: '4px' }}>
                        {user?.name || (isEnglish ? 'Farmer' : 'शेतकरी')}
                    </h2>
                    <p style={{
                        fontSize: '0.9rem',
                        opacity: 0.9,
                        marginBottom: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                    }}>
                        <Mail size={14} /> {user?.email}
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
                                    ? (farm.farmSize ? farm.farmSize + ' ' + (farm.farmSizeUnit || 'Acres') : '0 Acres')
                                    : (farm.farmSize ? farm.farmSize + ' ' + (farm.farmSizeUnit === 'acres' ? 'एकर' : farm.farmSizeUnit) : '0 एकर'),
                                sub: isEnglish ? 'Total Area' : 'एकूण क्षेत्र'
                            },
                            {
                                val: farm.location || (isEnglish ? 'Not Set' : 'सेट नाही'),
                                sub: isEnglish ? 'Location' : 'ठिकाण'
                            },
                            {
                                val: isEnglish ? 'Premium' : 'प्रीमियम',
                                sub: isEnglish ? 'Account' : 'खाते'
                            }
                        ].map((stat, i) => (
                            <div key={i} style={{
                                background: 'rgba(255,255,255,0.1)',
                                padding: '12px 8px',
                                borderRadius: '16px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <div className="marathi" style={{ fontSize: '0.85rem', fontWeight: 800, textAlign: 'center' }}>{stat.val}</div>
                                <div style={{ fontSize: '0.6rem', opacity: 0.9, fontWeight: 600, marginTop: '4px' }}>{stat.sub}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Portfolio Section */}
                <div>
                    <h3 className="marathi" style={{
                        fontSize: '1.25rem',
                        fontWeight: '700',
                        color: darkMode ? 'white' : '#1f2937',
                        marginBottom: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        {isEnglish ? 'Farm Portfolio' : 'माझी शेती'}
                        <span style={{ fontSize: '0.85rem', fontWeight: '400', color: '#6b7280' }}>
                            {isEnglish ? '(Active Status)' : '(सक्रिय स्थिती)'}
                        </span>
                    </h3>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isDesktop ? 'repeat(2, 1fr)' : '1fr',
                        gap: '16px'
                    }}>
                        {[
                            {
                                icon: Sprout,
                                title: isEnglish ? 'Soil Type' : 'मातीचा प्रकार',
                                value: farm.soilType || (isEnglish ? 'Unknown' : 'अज्ञात')
                            },
                            {
                                icon: MapPin,
                                title: isEnglish ? 'Location' : 'ठिकाण',
                                value: farm.location || (isEnglish ? 'Unknown' : 'अज्ञात')
                            },
                            {
                                icon: Tractor,
                                title: isEnglish ? 'Farm Name' : 'शेताचे नाव',
                                value: farm.farmName || (isEnglish ? 'Not Assigned' : 'नेमले नाही')
                            },
                            {
                                icon: Droplets,
                                title: isEnglish ? 'Current Crops' : 'चालू पिके',
                                value: farm.mainCrops?.length > 0 ? farm.mainCrops.join(', ') : (isEnglish ? 'None' : 'काहीही नाही')
                            }
                        ].map((item, i) => (
                            <div key={i} style={{
                                background: darkMode ? '#1f2937' : '#f9fafb',
                                borderRadius: '24px',
                                padding: '20px',
                                boxShadow: darkMode ? 'none' : '0 2px 8px rgba(0,0,0,0.02)',
                                border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #f0f0f0',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '12px',
                                transition: 'all 0.2s ease'
                            }}>
                                <div style={{
                                    background: 'rgba(22, 163, 74, 0.1)',
                                    width: '44px',
                                    height: '44px',
                                    borderRadius: '14px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <item.icon size={22} color="#16a34a" />
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.7rem', color: darkMode ? '#9ca3af' : '#6b7280', marginBottom: '4px', fontWeight: 600 }}>{item.title}</div>
                                    <div className="marathi" style={{ fontSize: '0.95rem', fontWeight: '700', color: darkMode ? 'white' : '#111827' }}>{item.value}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <button
                        onClick={onEdit}
                        style={{
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
                            transition: 'all 0.2s ease',
                            boxShadow: '0 4px 12px rgba(22, 163, 74, 0.2)'
                        }}
                    >
                        <Edit2 size={20} />
                        {isEnglish ? 'Edit Farm Information' : 'शेतीची माहिती बदला'}
                    </button>

                    <button
                        onClick={logout}
                        style={{
                            width: '100%',
                            padding: '16px',
                            background: 'transparent',
                            color: '#ef4444',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            fontSize: '1rem',
                            fontWeight: '600',
                            border: `2px solid #fee2e2`,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        {isEnglish ? 'Log Out' : 'लॉग आउट'}
                    </button>
                </div>
            </div>
        </Motion.div >
    );
};

export default ProfileScreen;
