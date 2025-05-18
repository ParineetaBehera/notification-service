const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// POST /notifications
router.post('/', notificationController.sendNotification);

// GET /notifications/user/:id
router.get('/user/:id', notificationController.getUserNotifications);

module.exports = router;
