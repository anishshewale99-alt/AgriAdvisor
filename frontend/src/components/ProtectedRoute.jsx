import React from 'react';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requireOnboarding = false }) => {
    const { isAuthenticated, isOnboarded, loading } = useAuth();

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: 'var(--bg-primary)'
            }}>
                <div style={{
                    textAlign: 'center',
                    color: 'var(--text-primary)'
                }}>
                    <div className="spinner" style={{
                        width: '50px',
                        height: '50px',
                        border: '4px solid rgba(0,0,0,0.1)',
                        borderTop: '4px solid var(--accent-green)',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 20px'
                    }}></div>
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        // User not logged in - show landing/login
        return null; // App.jsx will handle showing landing screen
    }

    if (requireOnboarding && !isOnboarded) {
        // User logged in but not onboarded - show farm info screen
        return null; // App.jsx will handle showing farm info screen
    }

    return children;
};

export default ProtectedRoute;
