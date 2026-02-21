import React from 'react';
import { TrendingUp, Droplets, ThermometerSun } from 'lucide-react';
import '../styles/CropAnalysis.css';

const CropAnalysis = () => {
    return (
        <div className="analysis-viewer">
            {/* Market Trend Card */}
            <div className="analysis-card">
                <div className="card-header">
                    <TrendingUp size={20} color="var(--primary)" />
                    <h4 className="marathi">बाजार कल / Market Trend</h4>
                </div>
                <div style={{ height: '120px', display: 'flex', alignItems: 'flex-end', gap: '8px', padding: '10px 0' }}>
                    {[40, 65, 55, 80, 70, 95].map((h, i) => (
                        <div key={i} style={{ flex: 1, background: i === 5 ? 'var(--primary)' : '#E8F5E9', height: `${h}%`, borderRadius: '4px' }} />
                    ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    <span>Sept</span><span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span><span>Feb</span>
                </div>
            </div>

            {/* Environmental Factors */}
            <div className="grid-2" style={{ gap: '16px', marginBottom: '16px' }}>
                <div className="mini-card">
                    <ThermometerSun size={20} color="#f59e0b" />
                    <div className="marathi">तापमान</div>
                    <div className="val">25-30°C</div>
                </div>
                <div className="mini-card">
                    <Droplets size={20} color="#3b82f6" />
                    <div className="marathi">पाणी</div>
                    <div className="val">Medium</div>
                </div>
            </div>

            {/* Risk Assessment / AI Insights Footer */}
            <div className="analysis-card" style={{ border: '1px solid rgba(0,0,0,0.03)' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                    <span style={{ fontWeight: 800, color: 'var(--primary)', display: 'block', marginBottom: '4px', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        AI Insights • जोखीम विश्लेषण
                    </span>
                    वर्तमान हवामान आणि बाजार कलानुसार, या पिकासाठी मध्यम जोखीम आहे. आगामी काळात किमती स्थिर राहण्याची शक्यता आहे.
                    <br />
                    <span style={{ fontSize: '0.8rem', opacity: 0.8, fontStyle: 'italic' }}>
                        Risk is moderate based on current weather and market trends. Prices are expected to remain stable.
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CropAnalysis;
