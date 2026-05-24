// File: src/routes/notificationRoutes.js
const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/my-alerts', protect, notificationController.getMyNotifications);
router.post('/sync-token', protect, notificationController.syncFcmToken);

module.exports = router;