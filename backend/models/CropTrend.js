const mongoose = require('mongoose');

const CropTrendSchema = new mongoose.Schema({
    commodity: { type: String, required: true, unique: true },
    percentageChange: { type: Number, default: 0 },
    trend: { type: String, enum: ['Rising', 'Falling', 'Stable'], default: 'Stable' },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CropTrend', CropTrendSchema);
