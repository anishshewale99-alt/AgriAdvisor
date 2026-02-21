require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const { parseAgmarknetCSV } = require('../services/csvParser');
const { upsertCropPrices } = require('../services/priceStore');
const { calculateTrends } = require('../services/trendCalculator');

async function importLocalCSV(filename) {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/agriadvisor';
    const csvPath = path.isAbsolute(filename) ? filename : path.resolve(process.cwd(), filename);

    if (!fs.existsSync(csvPath)) {
        console.error(`Error: File not found at ${csvPath}`);
        process.exit(1);
    }

    try {
        console.log(`Connecting to MongoDB...`);
        await mongoose.connect(MONGODB_URI);
        console.log('Connected.');

        console.log(`Parsing local CSV: ${filename}...`);
        const records = await parseAgmarknetCSV(csvPath);
        console.log(`Parsed ${records.length} records.`);

        if (records.length === 0) {
            console.warn('No records found in CSV.');
            return;
        }

        console.log('Upserting to MongoDB...');
        const result = await upsertCropPrices(records);
        console.log('Upsert result:', result);

        console.log('Calculating trends...');
        const trendCount = await calculateTrends();
        console.log(`Trends updated for ${trendCount} commodities.`);

        console.log('DONE!');
    } catch (err) {
        console.error('Migration failed:', err.message);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
}

// Get filename from command line argument
const filename = process.argv[2];
if (!filename) {
    console.log('Usage: node scripts/importCsv.js <filename.csv>');
    process.exit(1);
}

importLocalCSV(filename);
