import React, { useEffect, useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { Bell, MessageSquare, X } from 'lucide-react';

const NotificationTray = ({ notifications, removeNotification, isEnglish, setScreen, setTab }) => {
    return (
        <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 10000,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            pointerEvents: 'none',
            maxWidth: '320px',
            width: 'calc(100% - 40px)'
        }}>
            <AnimatePresence>
                {notifications.map((notif) => (
                    <Motion.div
                        key={notif._id || notif.timestamp}
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                        onClick={() => {
                            setTab('community');
                            setScreen('community');
                            removeNotification(notif._id || notif.timestamp);
                        }}
                        style={{
                            background: 'white',
                            borderRadius: '16px',
                            padding: '16px',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                            display: 'flex',
                            gap: '12px',
                            alignItems: 'flex-start',
                            cursor: 'pointer',
                            pointerEvents: 'auto',
                            borderLeft: '4px solid var(--primary)',
                            position: 'relative'
                        }}
                    >
                        <div style={{
                            background: 'rgba(46, 125, 50, 0.1)',
                            padding: '10px',
                            borderRadius: '12px',
                            color: 'var(--primary)'
                        }}>
                            {notif.type === 'post' ? <Bell size={20} /> : <MessageSquare size={20} />}
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#111827', marginBottom: '2px' }}>
                                {isEnglish
                                    ? `New community ${notif.type}`
                                    : `नवीन समुदाय ${notif.type === 'post' ? 'पोस्ट' : 'संदेश'}`}
                            </div>
                            <div style={{ fontSize: '0.85rem', color: '#4b5563', lineHeight: 1.4 }}>
                                <span style={{ fontWeight: 700 }}>{notif.authorName}:</span> {notif.content.substring(0, 45)}{notif.content.length > 45 ? '...' : ''}
                            </div>
                        </div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                removeNotification(notif._id || notif.timestamp);
                            }}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#9ca3af',
                                cursor: 'pointer',
                                padding: '4px'
                            }}
                        >
                            <X size={16} />
                        </button>
                    </Motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default NotificationTray;
