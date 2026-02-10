const express = require('express');
const router = express.Router();
const Crop = require('../models/Crop');

// Get all crops
router.get('/', async (req, res) => {
    try {
        const crops = await Crop.find();
        res.json(crops);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Seed some initial data if empty
router.post('/seed', async (req, res) => {
    const seedData = [
        {
            nameMar: 'गहू',
            nameEn: 'Wheat',
            price: '₹2,400',
            msp: '₹2,275',
            matchPercentage: 95,
            riskLevel: 'Low',
            imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=400',
            stages: [
                { labelMar: 'पेरणी', labelEn: 'Sowing', dateMar: '१५ नोव्हेंबर', dateEn: '15 Nov', completed: true },
                { labelMar: 'पहिले पाणी', labelEn: 'First Irrigation', dateMar: '१० डिसेंबर', dateEn: '10 Dec', completed: true },
                { labelMar: 'फुलोरा अवस्था', labelEn: 'Flowering Stage', dateMar: '१० फेब्रुवारी', dateEn: '10 Feb', completed: false }
            ]
        },
        {
            nameMar: 'हरभरा',
            nameEn: 'Gram',
            price: '₹5,200',
            msp: '₹5,440',
            matchPercentage: 88,
            riskLevel: 'Medium',
            imageUrl: 'https://images.unsplash.com/photo-1615485240383-cc906a59600a?auto=format&fit=crop&q=80&w=400',
            stages: []
        }
    ];

    try {
        await Crop.deleteMany({});
        const crops = await Crop.insertMany(seedData);
        res.status(201).json(crops);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
