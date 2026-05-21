// File: src/routes/leaveRoutes.js
const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');
const { protect } = require('../middlewares/authMiddleware');

// Protected routes (Staff must be logged in to apply or view leaves)
router.post('/apply', protect, leaveController.applyLeave);
router.get('/my-leaves', protect, leaveController.getMyLeaves);

module.exports = router;
