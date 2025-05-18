// workers/notificationWorker.js

const { Worker } = require('bullmq');
const Notification = require('../models/Notification');
const { redisConnection } = require('../utils/redisClient');
const connectDB = require('../data/db');

console.log('👷 Worker started. Listening for notification jobs...');

// Step 1: Connect to MongoDB
connectDB().then(() => {
  console.log('✅ MongoDB connected in worker');
}).catch((err) => {
  console.error('❌ Failed to connect MongoDB in worker:', err.message);
  process.exit(1);
});

// Step 2: Set up BullMQ Worker
const worker = new Worker('notificationQueue', async (job) => {
  const { userId, type, message } = job.data;

  console.log('📥 New Job received:', job.name, job.data);

  // Simulate sending
  switch (type) {
    case 'email':
      console.log(`📧 Sending EMAIL to user ${userId}: ${message}`);
      break;
    case 'sms':
      console.log(`📱 Sending SMS to user ${userId}: ${message}`);
      break;
    case 'in-app':
    default:
      console.log(`🔔 In-app notification for user ${userId}: ${message}`);
      break;
  }

  // Save to MongoDB
  await Notification.create({
    userId,
    type,
    message,
    timestamp: new Date(),
  });

  console.log(`📝 [${type}] Saved notification for user ${userId}`);
}, {
  connection: redisConnection,
});

// Step 3: Handle events
worker.on('completed', (job) => {
  console.log(`✅ Job completed: ${job.id}`);
});

worker.on('failed', (job, err) => {
  console.error(`❌ Job failed: ${job.id}`, err.message);
});
