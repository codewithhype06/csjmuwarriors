// File: src/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Import both bouncers!
const { protect } = require('../middlewares/authMiddleware');
const { adminOnly } = require('../middlewares/adminMiddleware');

// 🔒 All routes below this line will automatically require BOTH middlewares!
router.use(protect);
router.use(adminOnly);

// Employee Approval Routes
router.get('/employees/pending', adminController.getPendingEmployees);
router.put('/employees/approve/:id', adminController.approveEmployee); // :id is a dynamic variable!

// Leave Approval Routes
router.get('/leaves/pending', adminController.getPendingLeaves);
router.put('/leaves/update/:id', adminController.updateLeaveStatus);

module.exports = router;