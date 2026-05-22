// File: src/routes/payrollRoutes.js
const express = require('express');
const router = express.Router();
const payrollController = require('../controllers/payrollController');
const { protect } = require('../middlewares/authMiddleware');
const { adminOnly } = require('../middlewares/adminMiddleware');

// Admin generates the payroll
router.post('/generate', protect, adminOnly, payrollController.createPayslip);

// Staff fetches their payroll
router.get('/my-payslips', protect, payrollController.getMyPayslips);

module.exports = router;