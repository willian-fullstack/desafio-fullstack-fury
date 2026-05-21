import express from 'express';
import dotenv from 'dotenv';
import webhookRoutes from './routes/webhook';
import jobsRoutes from './routes/jobs';
import './worker'; // Initialize the BullMQ worker

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/webhook', webhookRoutes);
app.use('/jobs', jobsRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
