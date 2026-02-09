import React from 'react';

const MarketTicker = () => {
    const items = [
        { name: 'गहू / Wheat', price: '₹2,275', trend: 'up' },
        { name: 'कांदा / Onion', price: '₹1,500', trend: 'down' },
        { name: 'सोयाबीन / Soy', price: '₹4,800', trend: 'up' },
        { name: 'मका / Maize', price: '₹1,950', trend: 'stable' },
    ];

    return (
        <div className="ticker-container">
            <div className="ticker-content">
                {[...items, ...items].map((item, i) => (
                    <span key={i} className="ticker-item">
                        {item.name}: <span style={{ color: item.trend === 'up' ? 'var(--primary)' : item.trend === 'down' ? '#ef4444' : 'var(--text-main)' }}>
                            {item.price} {item.trend === 'up' ? '▲' : item.trend === 'down' ? '▼' : '•'}
                        </span>
                    </span>
                ))}
            </div>
        </div>
    );
};

export default MarketTicker;
