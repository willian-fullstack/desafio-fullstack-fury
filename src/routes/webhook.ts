import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { WebhookPayloadSchema } from '../validators';
import { takedownQueue } from '../queue';

const router = Router();

router.post('/violation', async (req: Request, res: Response): Promise<void> => {
  try {
    const payload = WebhookPayloadSchema.parse(req.body);

    // Job ID for idempotency: ensures no simultaneous jobs for same adId + tenantId
    const jobId = `takedown-${payload.tenantId}-${payload.adId}`;

    // Enqueue the job. We use the custom jobId for idempotency.
    const job = await takedownQueue.add('process-takedown', payload, {
      jobId,
    });

    res.status(202).json({
      message: 'Job enqueued successfully',
      jobId: job.id,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        error: 'Invalid payload',
        details: error.issues,
      });
      return;
    }

    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
