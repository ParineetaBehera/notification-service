const { Queue } = require('bullmq');
const { redisConnection } = require('../utils/redisClient');

const notificationQueue = new Queue('notificationQueue', {
  connection: redisConnection,
});

module.exports = notificationQueue;
