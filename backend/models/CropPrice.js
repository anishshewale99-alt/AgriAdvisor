const mongoose = require('mongoose');

const CropPriceSchema = new mongoose.Schema({
    commodity: { type: String, required: true },
    state: { type: String },
    district: { type: String },
    market: { type: String },
    modal_price: { type: Number, required: true },
    arrival: { type: Number },
    date: { type: Date, required: true }
}, { timestamps: true });

// Compound index to prevent duplicate entries for the same commodity in the same market on the same day
CropPriceSchema.index({ commodity: 1, market: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('CropPrice', CropPriceSchema);
