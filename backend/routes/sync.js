const express = require('express');
const router = express.Router();
const { runMandiUpdateJob } = require('../jobs/mandiUpdateJob');

/**
 * POST /api/sync-mandi
 * Triggers the mandi price update job manually.
 */
router.post('/', async (req, res) => {
    try {
        // Run the job in the background
        runMandiUpdateJob();

        return res.status(200).json({
            success: true,
            message: 'Mandi price sync started in background. The ticker will update in a few minutes.'
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Failed to start sync: ' + err.message
        });
    }
});

module.exports = router;
