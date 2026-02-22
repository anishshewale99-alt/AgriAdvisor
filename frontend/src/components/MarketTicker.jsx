import React, { useState, useEffect } from 'react';
import { cropData } from '../cropData';

const MarketTicker = ({ isEnglish, isDarkMode }) => {
    const [trends, setTrends] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrends = async () => {
            try {
                const response = await fetch('/api/trends');
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

                const result = await response.json();
                if (result.success && result.data && result.data.length > 0) {
                    // Filter: Only include crops with a price > 0 that exist in our cropData file
                    const filtered = result.data.filter(item => {
                        const hasPrice = item.currentPrice && item.currentPrice > 0;
                        const existsInFile = cropData.some(c =>
                            c.englishName.toLowerCase().includes(item.commodity.toLowerCase()) ||
                            c.marathiName.includes(item.commodity)
                        );
                        return hasPrice && existsInFile;
                    });

                    if (filtered.length === 0) {
                        useFallback();
                        return;
                    }

                    const enriched = filtered.map(item => {
                        const cropMatch = cropData.find(c =>
                            c.englishName.toLowerCase().includes(item.commodity.toLowerCase()) ||
                            c.marathiName.includes(item.commodity)
                        );

                        let displayName = item.commodity;
                        if (cropMatch) {
                            displayName = isEnglish
                                ? `${cropMatch.englishName} (${cropMatch.marathiName})`
                                : `${cropMatch.marathiName} (${cropMatch.englishName})`;
                        }

                        return {
                            ...item,
                            commodity: displayName,
                            unit: cropMatch ? cropMatch.price.split('/-')[1] : 'quintal'
                        };
                    });
                    setTrends(enriched);
                } else {
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
            // Use crops from cropData as fallback, ensuring they all have valid prices
            const fallbacks = cropData.map(c => {
                const priceParts = c.price.split('/-');
                const numericPrice = parseInt(priceParts[0].replace(/[₹,]/g, ''));
                // Use a more realistic stable/rising trend for fallback
                const change = (Math.random() * 1.5).toFixed(1);
                return {
                    commodity: isEnglish ? `${c.englishName} (${c.marathiName})` : `${c.marathiName} (${c.englishName})`,
                    currentPrice: numericPrice,
                    unit: priceParts[1] || 'quintal',
                    percentageChange: change,
                    trend: parseFloat(change) > 0 ? 'Rising' : 'Stable'
                };
            });
            setTrends(fallbacks);
        };

        fetchTrends();
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
                        <span style={{ marginLeft: '8px', fontWeight: 600, color: isDarkMode ? '#9ca3af' : '#64748b', fontSize: '0.85rem' }}>
                            ₹{item.currentPrice?.toLocaleString()}/-{item.unit || 'quintal'}
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
