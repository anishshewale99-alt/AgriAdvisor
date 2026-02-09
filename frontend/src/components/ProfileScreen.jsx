import React from 'react';
import { Settings, CreditCard, Shield, Map, LogOut, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ProfileScreen = () => {
    const menuItems = [
        { icon: Map, label: 'माझी शेती / My Lands', color: '#4CAF50' },
        { icon: CreditCard, label: 'पेमेंट आणि बिले / Payments', color: '#2196F3' },
        { icon: Shield, label: 'सुरक्षा / Security', color: '#F44336' },
        { icon: Settings, label: 'सेटिंग्ज / Settings', color: '#757575' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="app-shell"
        >
            <div className="profile-header">
                <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
                    alt="Profile"
                    className="profile-img"
                />
                <h2 className="marathi" style={{ fontSize: '1.5rem' }}>पाटील साहेब</h2>
                <p style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Patil Saheb • +91 98XXX XXXXX</p>
                <div style={{ marginTop: '12px', display: 'inline-block', background: '#E8F5E9', color: '#2E7D32', padding: '4px 12px', borderRadius: '30px', fontSize: '0.75rem', fontWeight: 800 }}>
                    VERIFIED FARMER
                </div>
            </div>

            <div style={{ marginTop: '20px' }}>
                {menuItems.map((item, i) => (
                    <div key={i} className="setting-item">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{ background: `${item.color}15`, padding: '10px', borderRadius: '12px', color: item.color }}>
                                <item.icon size={20} />
                            </div>
                            <span className="marathi">{item.label}</span>
                        </div>
                        <ChevronRight size={18} color="#ccc" />
                    </div>
                ))}
            </div>

            <div style={{ padding: '20px', marginTop: '40px' }}>
                <button style={{ width: '100%', padding: '16px', borderRadius: '16px', background: '#fef2f2', border: '1px solid #fee2e2', color: '#ef4444', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <LogOut size={20} /> लॉगआउट / Logout
                </button>
            </div>
        </motion.div>
    );
};

export default ProfileScreen;
