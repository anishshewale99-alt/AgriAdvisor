import React, { useState, useEffect } from 'react';

const MarketTicker = ({ isEnglish }) => {
    const [trends, setTrends] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrends = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/trends`);
                const result = await response.json();
                if (result.success) {
                    setTrends(result.data);
                }
            } catch (err) {
                console.error('Error fetching trends:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchTrends();
        // Refresh every 10 minutes
        const interval = setInterval(fetchTrends, 10 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    if (loading || trends.length === 0) {
        const loadingText = isEnglish ? 'Mandi prices updating...' : 'मंडीचे भाव अपडेट होत आहेत...';
        return (
            <div className="ticker-container">
                <div className="ticker-content">
                    <span className="ticker-item">{loadingText} {loadingText}</span>
                </div>
            </div>
        );
    }

    // Double/Triple the items to ensure smooth infinite loop
    const displayItems = [...trends, ...trends, ...trends];

    return (
        <div className="ticker-container" style={{
            background: '#f8fafc',
            borderBottom: '1px solid #e2e8f0',
            height: '40px',
            display: 'flex',
            alignItems: 'center'
        }}>
            <div className="ticker-content">
                {displayItems.map((item, i) => (
                    <span key={i} className="ticker-item" style={{ display: 'inline-flex', alignItems: 'center', margin: '0 20px' }}>
                        <span style={{ fontWeight: 600, color: '#1e293b', fontSize: '0.9rem' }}>{item.commodity}</span>
                        <span style={{
                            marginLeft: '10px',
                            padding: '4px 10px',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            background: item.trend === 'Rising' ? '#dcfce7' : item.trend === 'Falling' ? '#fee2e2' : '#f1f5f9',
                            color: item.trend === 'Rising' ? '#166534' : item.trend === 'Falling' ? '#991b1b' : '#64748b',
                            border: `1px solid ${item.trend === 'Rising' ? '#bbf7d0' : item.trend === 'Falling' ? '#fecaca' : '#e2e8f0'}`
                        }}>
                            {item.trend === 'Rising' ? '▲' : item.trend === 'Falling' ? '▼' : '•'}
                            {item.percentageChange > 0 ? '+' : ''}{item.percentageChange}%
                        </span>
                    </span>
                ))}
            </div>
        </div>
    );
};

export default MarketTicker;
