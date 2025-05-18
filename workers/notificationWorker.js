const { Worker } = require('bullmq');
const Notification = require('../models/Notification');
const { redisConnection } = require('../utils/redisClient');
const connectDB = require('../data/db');
const sendEmail = require('../utils/emailSender'); // 🔔 import



console.log('👷 Worker started. Listening for notification jobs...');

connectDB().then(() => {
  console.log('✅ MongoDB connected in worker');
}).catch((err) => {
  console.error('❌ Failed to connect MongoDB in worker:', err.message);
  process.exit(1);
});

const worker = new Worker('notificationQueue', async (job) => {
  const { userId, type, message } = job.data;

  console.log('📥 New Job received:', job.name, job.data);

  // Save notification to MongoDB
  await Notification.create({
    userId,
    type,
    message,
    timestamp: new Date(),
  });

  // Send Email if type is "email"
  if (type === 'email') {
    try {
      await sendEmail(userId, 'New Notification', message);
      console.log(`📧 Email sent to ${userId}`);
    } catch (err) {
      console.error(`❌ Failed to send email to ${userId}`, err.message);
      throw err; // so BullMQ retries
    }
  }

  console.log(`📝 [${type}] Notification processed for user ${userId}`);
}, {
  connection: redisConnection,
});

worker.on('completed', (job) => {
  console.log(`✅ Job completed: ${job.id}`);
});

worker.on('failed', (job, err) => {
  console.error(`❌ Job failed: ${job.id}`, err.message);
});


