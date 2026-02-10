import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, TrendingUp, DollarSign, Sprout, Droplets, ThermometerSun } from 'lucide-react';

const CropAnalysis = ({ cropData }) => {
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

            {/* Soil Suitability */}
            <div className="analysis-card">
                <div className="card-header">
                    <Sprout size={20} color="var(--primary)" />
                    <h4 className="marathi">जमीन सुसंगतता / Soil Analysis</h4>
                </div>
                <div className="grid-2">
                    <div className="stat-item">
                        <span className="label">PH Level</span>
                        <span className="value">6.5 - 7.5</span>
                    </div>
                    <div className="stat-item">
                        <span className="label">Nitrogen</span>
                        <span className="value">High</span>
                    </div>
                    <div className="stat-item">
                        <span className="label">Moisture</span>
                        <span className="value">40%</span>
                    </div>
                    <div className="stat-item">
                        <span className="label">Organic Carbon</span>
                        <span className="value">0.8%</span>
                    </div>
                </div>
            </div>

            {/* Financial Breakdown */}
            <div className="analysis-card dark">
                <div className="card-header">
                    <DollarSign size={20} color="#fff" />
                    <h4 className="marathi" style={{ color: '#fff' }}>खर्च आणि नफा / Cost & Profit</h4>
                </div>
                <div style={{ marginTop: '16px' }}>
                    <div className="cost-row">
                        <span>बियाणे / Seeds</span>
                        <span>₹2,500</span>
                    </div>
                    <div className="cost-row">
                        <span>खते / Fertilizers</span>
                        <span>₹4,800</span>
                    </div>
                    <div className="cost-row">
                        <span>मजुरी / Labor</span>
                        <span>₹3,500</span>
                    </div>
                    <div className="total-profit-row">
                        <span className="marathi">अपेक्षित नफा / Exp. Profit</span>
                        <span style={{ color: '#81C784' }}>+₹18,500</span>
                    </div>
                </div>
            </div>

            {/* Environmental Factors */}
            <div className="grid-2" style={{ gap: '16px' }}>
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
        </div>
    );
};

export default CropAnalysis;
