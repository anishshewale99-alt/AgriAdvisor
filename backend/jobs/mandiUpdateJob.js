const { downloadLatestMandiData } = require('../services/downloader');
const { parseAgmarknetCSV } = require('../services/csvParser');
const { upsertCropPrices } = require('../services/priceStore');
const { calculateTrends } = require('../services/trendCalculator');

async function runMandiUpdateJob() {
    console.log('[MandiJob] Starting update job...');
    try {
        const filePath = await downloadLatestMandiData();
        const records = await parseAgmarknetCSV(filePath);
        if (records.length === 0) return;

        await upsertCropPrices(records);
        await calculateTrends();
        console.log('[MandiJob] Update finished successfully.');
    } catch (err) {
        console.error('[MandiJob] Job failed:', err.message);
    }
}

module.exports = { runMandiUpdateJob };
