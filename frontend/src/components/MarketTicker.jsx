import React, { useState, useEffect } from 'react';

const MarketTicker = ({ isEnglish, isDarkMode }) => {
    const [trends, setTrends] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrends = async () => {
            try {
                // Use relative URL to leverage Vite proxy
                const response = await fetch('/api/trends');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                if (result.success && result.data && result.data.length > 0) {
                    setTrends(result.data);
                } else {
                    console.warn('Trends API returned no data, using fallback.');
                    useFallback();
                }
            } catch (err) {
                console.error('Error fetching trends:', err);
                useFallback();
            } finally {
                setLoading(false);
            }
        };

        const useFallback = () => {
            // Realistic fallback data if API is empty or failing
            const fallbacks = [
                { commodity: isEnglish ? 'Wheat (गहू)' : 'गहू (Wheat)', currentPrice: 2450, percentageChange: 2.1, trend: 'Rising' },
                { commodity: isEnglish ? 'Onion (कांदा)' : 'कांदा (Onion)', currentPrice: 1800, percentageChange: -5.4, trend: 'Falling' },
                { commodity: isEnglish ? 'Cotton (कापूस)' : 'कापूस (Cotton)', currentPrice: 7200, percentageChange: 0.8, trend: 'Rising' },
                { commodity: isEnglish ? 'Soybean (सोयाबीन)' : 'सोयाबीन (Soybean)', currentPrice: 4600, percentageChange: -1.2, trend: 'Falling' },
                { commodity: isEnglish ? 'Tomato (टोमॅटो)' : 'टोमॅटो (Tomato)', currentPrice: 1200, percentageChange: 12.5, trend: 'Rising' }
            ];
            setTrends(fallbacks);
        };

        fetchTrends();
        // Refresh every 10 minutes
        const interval = setInterval(fetchTrends, 10 * 60 * 1000);
        return () => clearInterval(interval);
    }, [isEnglish]);

    if (loading) {
        const loadingText = isEnglish ? 'Mandi prices updating...' : 'मंडीचे भाव अपडेट होत आहेत...';
        return (
            <div className="ticker-container" style={{
                background: isDarkMode ? '#111827' : '#f8fafc',
                borderBottom: isDarkMode ? '1px solid #374151' : '1px solid #e2e8f0',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden'
            }}>
                <div className="ticker-content">
                    <span className="ticker-item" style={{ color: isDarkMode ? '#9ca3af' : '#64748b' }}>{loadingText}</span>
                    <span className="ticker-item" style={{ color: isDarkMode ? '#9ca3af' : '#64748b' }}>{loadingText}</span>
                </div>
            </div>
        );
    }

    // Double the items to ensure smooth infinite loop (50% translation)
    const displayItems = [...trends, ...trends];

    return (
        <div className="ticker-container" style={{
            background: isDarkMode ? '#111827' : '#f8fafc',
            borderBottom: isDarkMode ? '1px solid #374151' : '1px solid #e2e8f0',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden'
        }}>
            <div className="ticker-content" style={{ animationDuration: `${displayItems.length * 5}s` }}>
                {displayItems.map((item, i) => (
                    <span key={i} className="ticker-item" style={{ display: 'inline-flex', alignItems: 'center', margin: '0 30px' }}>
                        <span style={{ fontWeight: 800, color: isDarkMode ? '#fff' : '#1e293b', fontSize: '0.9rem' }}>
                            {item.commodity}
                        </span>
                        <span style={{ marginLeft: '8px', fontWeight: 600, color: isDarkMode ? '#9ca3af' : '#64748b' }}>
                            ₹{item.currentPrice?.toLocaleString() || 'N/A'}
                        </span>
                        <span style={{
                            marginLeft: '10px',
                            padding: '4px 10px',
                            borderRadius: '12px',
                            fontSize: '0.86rem',
                            fontWeight: 800,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            background: item.trend === 'Rising' ? '#22c55e' : item.trend === 'Falling' ? '#ef4444' : (isDarkMode ? '#374151' : '#f1f5f9'),
                            color: item.trend === 'Rising' || item.trend === 'Falling' ? '#fff' : (isDarkMode ? '#e5e7eb' : '#64748b'),
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
