const CropPrice = require('../models/CropPrice');

/**
 * Upserts an array of parsed crop price records into MongoDB.
 * Uses the compound index (commodity + market + date) to avoid duplicates.
 *
 * @param {Array} records - Parsed records from csvParser.
 * @returns {Promise<{ upserted: number, matched: number, errors: number }>}
 */
async function upsertCropPrices(records) {
    let upserted = 0;
    let matched = 0;
    let errors = 0;

    const ops = records
        .filter((r) => r.commodity && r.market && r.date)
        .map((r) => ({
            updateOne: {
                filter: {
                    commodity: r.commodity,
                    market: r.market,
                    date: r.date,
                },
                update: { $set: r },
                upsert: true,
            },
        }));

    if (ops.length === 0) {
        console.log('[PriceStore] No valid records to upsert.');
        return { upserted: 0, matched: 0, errors: 0 };
    }

    // Process in batches of 500 to avoid large payload issues
    const BATCH_SIZE = 500;
    for (let i = 0; i < ops.length; i += BATCH_SIZE) {
        const batch = ops.slice(i, i + BATCH_SIZE);
        try {
            const result = await CropPrice.bulkWrite(batch, { ordered: false });
            upserted += result.upsertedCount || 0;
            matched += result.matchedCount || 0;
        } catch (err) {
            console.error(`[PriceStore] Batch ${Math.floor(i / BATCH_SIZE) + 1} error:`, err.message);
            errors += batch.length;
        }
    }

    console.log(
        `[PriceStore] Done — Upserted: ${upserted}, Matched/Updated: ${matched}, Errors: ${errors}`
    );
    return { upserted, matched, errors };
}

module.exports = { upsertCropPrices };
