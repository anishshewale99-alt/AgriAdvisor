const CropPrice = require('../models/CropPrice');
const CropTrend = require('../models/CropTrend');

/**
 * Calculates price trends for all commodities.
 * Logic: Compares the most recent price with the previous recorded price on a different date.
 * Threshold: Any change > 0.1% is Rising, < -0.1% is Falling.
 */
async function calculateTrends() {
    const commodities = await CropPrice.distinct('commodity');

    if (commodities.length === 0) {
        console.log('[TrendCalc] No commodity data found.');
        return 0;
    }

    const ops = [];

    for (const commodity of commodities) {
        // Get recent records to find the two most recent unique dates
        const history = await CropPrice.find({ commodity })
            .sort({ date: -1 })
            .limit(20)
            .lean();

        if (history.length < 2) {
            const currentPrice = history.length > 0 ? history[0].modal_price : 0;
            ops.push(createOp(commodity, currentPrice, 0, 'Stable'));
            continue;
        }

        const latest = history[0];

        // Find the first record with a different date
        const previous = history.find(h => h.date.getTime() !== latest.date.getTime());

        if (!previous || previous.modal_price === 0) {
            ops.push(createOp(commodity, latest.modal_price, 0, 'Stable'));
            continue;
        }

        const currentPrice = latest.modal_price;
        const prevPrice = previous.modal_price;

        let percentageChange = ((currentPrice - prevPrice) / prevPrice) * 100;
        percentageChange = parseFloat(percentageChange.toFixed(2));

        let trend = 'Stable';
        if (percentageChange > 0.1) trend = 'Rising';
        else if (percentageChange < -0.1) trend = 'Falling';

        ops.push(createOp(commodity, currentPrice, percentageChange, trend));
    }

    if (ops.length > 0) {
        await CropTrend.bulkWrite(ops, { ordered: false });
    }

    console.log(`[TrendCalc] Done — Updated trends for ${ops.length} commodities.`);
    return ops.length;
}

function createOp(commodity, currentPrice, percentageChange, trend) {
    return {
        updateOne: {
            filter: { commodity },
            update: {
                $set: {
                    commodity,
                    currentPrice,
                    percentageChange,
                    trend,
                    updatedAt: new Date(),
                },
            },
            upsert: true,
        },
    };
}

module.exports = { calculateTrends };
