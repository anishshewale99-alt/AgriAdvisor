const mongoose = require('mongoose');

const CropSchema = new mongoose.Schema({
    nameMar: { type: String, required: true },
    nameEn: { type: String, required: true },
    price: { type: String, required: true },
    msp: { type: String },
    matchPercentage: { type: Number },
    riskLevel: { type: String }, // Low, Medium, High
    descriptionMar: { type: String },
    descriptionEn: { type: String },
    stages: [
        {
            labelMar: String,
            labelEn: String,
            dateMar: String,
            dateEn: String,
            completed: Boolean
        }
    ],
    imageUrl: { type: String }
});

module.exports = mongoose.model('Crop', CropSchema);
