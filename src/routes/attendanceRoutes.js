// File: src/routes/attendanceRoutes.js
const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const { protect } = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validateMiddleware');
const { attendanceSchema } = require('../validations/attendanceValidation');

// NAYA ROUTE: Check status before showing the screen
router.get('/status', protect, attendanceController.getTodayStatus);

router.post('/check-in', protect, validate(attendanceSchema), attendanceController.checkIn);
router.post('/check-out', protect, attendanceController.checkOut);

module.exports = router;