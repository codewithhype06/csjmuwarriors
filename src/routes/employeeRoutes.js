// File: src/routes/employeeRoutes.js
const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const { protect } = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validateMiddleware');
const { registerSchema, loginSchema } = require('../validations/employeeValidation');

router.post('/register', validate(registerSchema), employeeController.registerEmployee);
router.post('/login', validate(loginSchema), employeeController.loginEmployee);
router.get('/profile', protect, employeeController.getProfile);

// 👇 --- NEW: ROUTE TO UPDATE PROFILE --- 👇
router.put('/profile', protect, employeeController.updateProfile);

// --- NEW ROUTES FOR ADMIN APPROVALS ---
router.get('/pending', employeeController.getPendingApprovals);
router.put('/approve/:id', employeeController.approveEmployee);

module.exports = router;