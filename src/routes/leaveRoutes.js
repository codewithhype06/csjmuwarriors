// File: src/routes/leaveRoutes.js
const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');
const { protect } = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validateMiddleware');
const { leaveSchema } = require('../validations/leaveValidation');

// Protected routes with validation for Employees
router.post('/apply', protect, validate(leaveSchema), leaveController.applyLeave);
router.get('/my-leaves', protect, leaveController.getMyLeaves);

// ✨ NEW: Admin Route to Approve/Reject Leaves
// Note: Abhi ke liye protect lagaya hai, but ensure karo tum Postman/Admin app se Valid Token bhej rahe ho.
router.put('/admin/update-leave/:id', protect, leaveController.adminApproveLeave);

module.exports = router;