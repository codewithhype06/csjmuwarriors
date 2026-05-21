// File: src/routes/payrollRoutes.js
const express = require('express');
const router = express.Router();
const payrollController = require('../controllers/payrollController');

// Import our Bouncers!
const { protect } = require('../middlewares/authMiddleware');
const { adminOnly } = require('../middlewares/adminMiddleware');

// 🔒 Route strictly locked down to Admins
router.post('/generate', protect, adminOnly, payrollController.createPayslip);

module.exports = router;