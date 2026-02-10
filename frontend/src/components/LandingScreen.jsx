import React from 'react';
import { motion } from 'framer-motion';
import { LogIn, Phone, Rocket, Languages, Volume2 } from 'lucide-react';

const LandingScreen = ({ onNext }) => {
    return (
        <div className="farm-bg">
            <div className="top-bar" style={{ background: 'transparent', position: 'absolute', top: 0, left: 0, width: '100%' }}>
                <div style={{ flex: 1 }} />
                <div className="right">
                    <div className="lang" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Languages size={16} />
                        मराठी / EN
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.8)', padding: '6px', borderRadius: '50%' }}>
                        <Volume2 size={20} color="var(--primary)" />
                    </div>
                </div>
            </div>

            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="glass-overlay"
                style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}
            >
                <div className="logo-circle">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/2329/2329115.png"
                        alt="Logo"
                        style={{ width: '50px' }}
                    />
                </div>

                <h1 className="marathi" style={{ fontSize: '1.75rem', marginBottom: '8px' }}>CropAdvisor मध्ये लॉगिन करा</h1>
                <p className="english-sub" style={{ fontSize: '1rem', marginBottom: '32px' }}>Sign in to continue</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <button className="cta-btn" style={{ background: 'white', color: 'var(--text-main)', border: '1px solid #eee', margin: 0, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                        <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" style={{ width: '20px' }} />
                        Google ने लॉगिन करा
                    </button>

                    <button className="cta-btn" style={{ margin: 0, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                        <Phone size={20} />
                        फोन नंबर वापरा
                    </button>

                    <div style={{ margin: '12px 0', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                        किंवा • or
                    </div>

                    <div style={{ position: 'relative' }}>
                        <input
                            type="text"
                            placeholder="ईमेल • Email"
                            style={{ width: '100%', padding: '16px', borderRadius: '12px', border: 'none', background: 'var(--bg-field)', marginBottom: '12px' }}
                        />
                    </div>

                    <button
                        onClick={onNext}
                        className="cta-btn yellow"
                        style={{ margin: 0, width: '100%', fontSize: '1.1rem', padding: '20px' }}
                    >
                        Guest Mode – सुरु करा 🚀
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default LandingScreen;
