import { Router, Request, Response } from 'express';
import { takedownQueue } from '../queue';

const router = Router();

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const job = await takedownQueue.getJob(id as string);

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
  } catch (error) {
    console.error('Get job error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
