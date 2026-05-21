import { Worker, Job } from 'bullmq';
import axios from 'axios';
import { redisConnection } from './queue';
import { WebhookPayload } from './validators';

export const takedownWorker = new Worker(
  'takedown-jobs',
  async (job: Job<WebhookPayload>) => {
    // Simulate HTTP external call to Meta API using jsonplaceholder
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1', {
      timeout: 5000,
    });
    
    // Ensure the response is successful
    if (response.status >= 200 && response.status < 300) {
      return { success: true, message: 'Takedown processed successfully' };
    } else {
      throw new Error(`External API failed with status ${response.status}`);
    }
  },
  {
    connection: redisConnection,
    concurrency: 5,
  }
);

takedownWorker.on('completed', (job) => {
  console.log(`Job with id ${job.id} has been completed`);
});

takedownWorker.on('failed', (job, err) => {
  console.log(`Job with id ${job?.id} has failed with ${err.message}`);
});
