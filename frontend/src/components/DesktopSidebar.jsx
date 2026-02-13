import React from 'react';
import { Home, Sprout, Users, User, Settings, LogOut, Moon, Sun, Mic } from 'lucide-react';
import { motion } from 'framer-motion';
import '../styles/DesktopSidebar.css';

const DesktopSidebar = ({ activeTab, setTab, setScreen, isDarkMode, toggleTheme, onLogout, lang, setLang }) => {
    const menuItems = [
        { id: 'home', icon: Home, labelMar: 'होम', labelEng: 'Home', screen: 'home' },
        { id: 'crops', icon: Sprout, labelMar: 'पीके', labelEng: 'Crops', screen: 'recommendations' },
        { id: 'community', icon: Users, labelMar: 'समुदाय', labelEng: 'Community', screen: 'community' },
        { id: 'profile', icon: User, labelMar: 'प्रोफाइल', labelEng: 'Profile', screen: 'profile' },
        { id: 'settings', icon: Settings, labelMar: 'सेटिंग्ज', labelEng: 'Settings', screen: 'settings' },
    ];

    return (
        <div className={`desktop-sidebar ${isDarkMode ? 'dark' : ''}`}>
            <div className="sidebar-header">
                <div className="logo-box">
                    <Sprout size={32} color="var(--primary)" />
                    <span className="logo-text">AgriAdvisor</span>
                </div>
            </div>

            <nav className="sidebar-nav">
                {menuItems.map((item) => (
                    <div
                        key={item.id}
                        className={`sidebar-item ${activeTab === item.id ? 'active' : ''}`}
                        onClick={() => {
                            setTab(item.id);
                            setScreen(item.screen);
                        }}
                    >
                        <item.icon size={24} />
                        <div className="sidebar-labels">
                            <span className="marathi">{item.labelMar}</span>
                            <span className="english">{item.labelEng}</span>
                        </div>
                    </div>
                ))}
            </nav>

            <div className="sidebar-footer">
                <button className="sidebar-action-btn" onClick={toggleTheme}>
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>

                <button className="sidebar-action-btn logout" onClick={onLogout}>
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default DesktopSidebar;
