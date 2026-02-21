require('dotenv').config();
const mongoose = require('mongoose');
const CropTrend = require('./models/CropTrend');

async function seedTrends() {
    const MONGODB_URI = process.env.MONGODB_URI;
    try {
        await mongoose.connect(MONGODB_URI);
        const initialTrends = [
            { commodity: 'Wheat (गहू)', percentageChange: 2.5, trend: 'Rising' },
            { commodity: 'Gram (हरभरा)', percentageChange: -1.2, trend: 'Falling' },
            { commodity: 'Soybean (सोयाबीन)', percentageChange: 0.5, trend: 'Rising' },
            { commodity: 'Cotton (कापूस)', percentageChange: 0.1, trend: 'Stable' },
            { commodity: 'Onion (कांदा)', percentageChange: 5.8, trend: 'Rising' }
        ];
        await CropTrend.deleteMany({});
        await CropTrend.insertMany(initialTrends);
        console.log('Successfully seeded trends.');
    } catch (err) {
        console.error('Seeding failed:', err);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
}
seedTrends();
