const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// POST /notifications
router.post('/', notificationController.sendNotification);

// GET /notifications/user/:id
router.get('/user/:id', notificationController.getUserNotifications);

module.exports = router;

/**
 * @swagger
 * /notifications:
 *   post:
 *     summary: Send a new notification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - type
 *               - message
 *             properties:
 *               userId:
 *                 type: string
 *               type:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Notification job queued
 */

/**
 * @swagger
 * /notifications/user/{id}:
 *   get:
 *     summary: Get notifications for a user
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of notifications
 */
