const notificationQueue = require('../queues/notificationQueue');
const Notification = require('../models/Notification');

exports.sendNotification = async (req, res) => {
  const { userId, type, message } = req.body;

  if (!userId || !type || !message) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields',
    });
  }

  try {
    await notificationQueue.add('sendNotification', { userId, type, message }, {
      attempts: 3,
      backoff: 5000,
    });

    res.status(200).json({
      success: true,
      message: 'Notification job queued successfully',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to queue notification',
      error: err.message,
    });
  }
};

exports.getUserNotifications = async (req, res) => {
  const { id } = req.params;

  try {
    const notifications = await Notification.find({ userId: id }).sort({ timestamp: -1 });

    res.status(200).json({
      success: true,
      data: notifications,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notifications',
      error: err.message,
    });
  }
};
