// File: src/routes/attendanceRoutes.js
const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const { protect } = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validateMiddleware');
const { attendanceSchema } = require('../validations/attendanceValidation');

// Check-In requires location and selfie validation
router.post('/check-in', protect, validate(attendanceSchema), attendanceController.checkIn);

// Check-Out only requires the user token (protect), NO body validation needed
router.post('/check-out', protect, attendanceController.checkOut);

module.exports = router;