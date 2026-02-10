import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, Droplets, CloudOff, ChevronRight } from 'lucide-react';

const FarmInfoScreen = ({ onNext }) => {
    const [acres, setAcres] = useState('2');
    const [soil, setSoil] = useState('Black Cotton');
    const [irrigation, setIrrigation] = useState(true);

    const soilTypes = [
        { id: 'Black Cotton', mr: 'काळी कापूस', en: 'Black Cotton', color: '#373B4D' },
        { id: 'Red Soil', mr: 'लाल माती', en: 'Red Soil', color: '#8D5858' },
        { id: 'Loamy', mr: 'चिकणमाती', en: 'Loamy', color: '#8D6E63' },
        { id: 'Sandy', mr: 'वालुकामय', en: 'Sandy', color: '#FFD54F' },
    ];

    return (
        <div className="app-shell" style={{ background: 'var(--bg-cream)', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                <div>
                    <h1 className="marathi" style={{ fontSize: '1.75rem', color: 'var(--primary-dark)' }}>तुमच्या शेताची माहिती</h1>
                    <p className="english-sub" style={{ fontSize: '1rem' }}>Tell us about your farm</p>
                </div>
                <div style={{ background: 'var(--primary)', padding: '12px', borderRadius: '50%', color: 'white' }}>
                    <Mic size={24} />
                </div>
            </div>

            <div style={{ marginBottom: '32px' }}>
                <h2 className="marathi" style={{ fontSize: '1.25rem', marginBottom: '4px' }}>शेत आकार (एकर)</h2>
                <p className="english-sub">Farm size in acres</p>
                <div className="pill-selector">
                    {['0.5', '1', '2', '3', '5+'].map(val => (
                        <div
                            key={val}
                            className={`pill-item ${acres === val ? 'active' : ''}`}
                            onClick={() => setAcres(val)}
                        >
                            {val}
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ marginBottom: '32px' }}>
                <h2 className="marathi" style={{ fontSize: '1.25rem', marginBottom: '4px' }}>माती प्रकार</h2>
                <p className="english-sub">Soil type</p>
                <div className="selection-grid">
                    {soilTypes.map(type => (
                        <div
                            key={type.id}
                            className={`choice-card ${soil === type.id ? 'active' : ''}`}
                            onClick={() => setSoil(type.id)}
                        >
                            <div className="choice-icon-box" style={{ background: type.color }} />
                            <div>
                                <div className="marathi" style={{ fontSize: '0.9rem' }}>{type.mr}</div>
                                <div className="english-sub">{type.en}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ marginBottom: '40px' }}>
                <h2 className="marathi" style={{ fontSize: '1.25rem', marginBottom: '4px' }}>सिंचन उपलब्ध?</h2>
                <p className="english-sub">Irrigation available?</p>
                <div className="selection-grid">
                    <div
                        className={`choice-card ${irrigation ? 'active' : ''}`}
                        onClick={() => setIrrigation(true)}
                        style={{ alignItems: 'center', textAlign: 'center' }}
                    >
                        <Droplets size={32} color={irrigation ? 'var(--primary)' : '#5F6368'} />
                        <div className="marathi">होय • Yes</div>
                    </div>
                    <div
                        className={`choice-card ${!irrigation ? 'active' : ''}`}
                        onClick={() => setIrrigation(false)}
                        style={{ alignItems: 'center', textAlign: 'center' }}
                    >
                        <CloudOff size={32} color={!irrigation ? 'var(--primary)' : '#5F6368'} />
                        <div className="marathi">नाही • No</div>
                    </div>
                </div>
            </div>

            <div className="bottom-cta-container" onClick={onNext}>
                <div className="marathi" style={{ fontSize: '1.2rem' }}>माहिती साठवा आणि पुढे जा 🌱</div>
                <ChevronRight size={24} />
            </div>
        </div>
    );
};

export default FarmInfoScreen;
