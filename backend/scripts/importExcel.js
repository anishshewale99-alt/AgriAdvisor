require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const { parseAgmarknetExcel } = require('../services/excelParser');
const { upsertCropPrices } = require('../services/priceStore');
const { calculateTrends } = require('../services/trendCalculator');

async function importLocalExcel(filename) {
    const MONGODB_URI = process.env.MONGODB_URI;
    const filePath = path.isAbsolute(filename) ? filename : path.resolve(process.cwd(), '..', filename);

    if (!fs.existsSync(filePath)) {
        console.error(`Error: File not found at ${filePath}`);
        process.exit(1);
    }

    try {
        console.log(`Connecting to MongoDB...`);
        await mongoose.connect(MONGODB_URI);
        console.log('Connected.');

        console.log(`Parsing local Excel: ${filename}...`);
        const records = await parseAgmarknetExcel(filePath);
        console.log(`Parsed ${records.length} records.`);

        if (records.length === 0) {
            console.warn('No records found in Excel.');
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
        console.error('Import failed:', err.message);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
}

const filename = process.argv[2];
if (!filename) {
    console.log('Usage: node scripts/importExcel.js <filename.xlsx>');
    process.exit(1);
}

importLocalExcel(filename);
