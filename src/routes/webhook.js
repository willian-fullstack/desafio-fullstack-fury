"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const validators_1 = require("../validators");
const queue_1 = require("../queue");
const router = (0, express_1.Router)();
router.post('/violation', async (req, res) => {
    try {
        const payload = validators_1.WebhookPayloadSchema.parse(req.body);
        // Job ID for idempotency: ensures no simultaneous jobs for same adId + tenantId
        const jobId = `takedown-${payload.tenantId}-${payload.adId}`;
        // Enqueue the job. We use the custom jobId for idempotency.
        const job = await queue_1.takedownQueue.add('process-takedown', payload, {
            jobId,
        });
        res.status(202).json({
            message: 'Job enqueued successfully',
            jobId: job.id,
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({
                error: 'Invalid payload',
                details: error.errors,
            });
            return;
        }
        console.error('Webhook error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
//# sourceMappingURL=webhook.js.map