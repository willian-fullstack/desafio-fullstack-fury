"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const queue_1 = require("../queue");
const router = (0, express_1.Router)();
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const job = await queue_1.takedownQueue.getJob(id);
        if (!job) {
            res.status(404).json({ error: 'Job not found' });
            return;
        }
        const state = await job.getState();
        res.status(200).json({
            jobId: job.id,
            status: state,
            attempts: job.attemptsMade,
            result: job.returnvalue || null,
            error: job.failedReason || null,
        });
    }
    catch (error) {
        console.error('Get job error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
//# sourceMappingURL=jobs.js.map