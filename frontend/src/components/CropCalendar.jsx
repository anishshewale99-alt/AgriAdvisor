import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle } from 'lucide-react';

const CropCalendar = ({ stages }) => {
    return (
        <div className="crop-calendar">
            <div className="timeline-container">
                {stages.map((stage, index) => (
                    <div key={index} className="timeline-item">
                        <div className="timeline-marker">
                            {stage.completed ? (
                                <div className="marker-icon completed">
                                    <CheckCircle2 size={16} />
                                </div>
                            ) : (
                                <div className="marker-icon pending">
                                    <Circle size={16} />
                                </div>
                            )}
                            {index !== stages.length - 1 && <div className="timeline-line"></div>}
                        </div>
                        <div className="timeline-content">
                            <div className="marathi" style={{ fontSize: '0.9rem', fontWeight: 700 }}>{stage.labelMar}</div>
                            <div className="english-sub" style={{ fontSize: '0.75rem' }}>{stage.labelEn}</div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                                {stage.dateMar} | {stage.dateEn}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CropCalendar;
