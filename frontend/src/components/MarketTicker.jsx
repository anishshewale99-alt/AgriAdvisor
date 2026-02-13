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
                {[...items, ...items, ...items, ...items].map((item, i) => (
                    <span key={i} className="ticker-item">
                        <span className="marathi">{item.name.split(' / ')[0]}</span>
                        <span style={{ margin: '0 4px', fontSize: '0.7rem', opacity: 0.6 }}>/</span>
                        <span style={{ fontWeight: 500 }}>{item.name.split(' / ')[1]}</span>
                        <span style={{
                            marginLeft: '8px',
                            padding: '2px 8px',
                            borderRadius: '6px',
                            background: item.trend === 'up' ? 'rgba(46, 125, 50, 0.1)' : item.trend === 'down' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(0,0,0,0.05)',
                            color: item.trend === 'up' ? 'var(--primary)' : item.trend === 'down' ? '#ef4444' : 'var(--text-muted)'
                        }}>
                            {item.price} {item.trend === 'up' ? '▲' : item.trend === 'down' ? '▼' : '•'}
                        </span>
                    </span>
                ))}
            </div>
        </div>
    );
};

export default MarketTicker;
