// File: src/routes/leaveRoutes.js
const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');
const { protect } = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validateMiddleware');
const { leaveSchema } = require('../validations/leaveValidation');

// Protected routes with validation
router.post('/apply', protect, validate(leaveSchema), leaveController.applyLeave);
router.get('/my-leaves', protect, leaveController.getMyLeaves);

module.exports = router;