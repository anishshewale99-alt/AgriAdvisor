const express = require('express');
const router = express.Router();
const CropTrend = require('../models/CropTrend');

/**
 * GET /api/trends
 *
 * Returns the top 5 commodities sorted by highest absolute percentage change.
 * Used by the frontend marquee/ticker component.
 *
 * Response shape:
 * {
 *   success: true,
 *   count: 5,
 *   data: [
 *     { commodity, percentageChange, trend, updatedAt },
 *     ...
 *   ]
 * }
 */
router.get('/', async (req, res) => {
    try {
        const trends = await CropTrend.find({})
            .select('commodity currentPrice percentageChange trend updatedAt -_id')
            .lean();

        return res.status(200).json({
            success: true,
            count: trends.length,
            data: trends,
        });
    } catch (err) {
        console.error('[TrendsRoute] Error fetching trends:', err.message);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch crop trends. Please try again later.',
        });
    }
});

module.exports = router;
