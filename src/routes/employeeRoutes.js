// File: src/routes/employeeRoutes.js
const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const { protect } = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validateMiddleware');
const { registerSchema, loginSchema } = require('../validations/employeeValidation');

// Applying the 'validate' middleware before the controller function
router.post('/register', validate(registerSchema), employeeController.registerEmployee);
router.post('/login', validate(loginSchema), employeeController.loginEmployee);
router.get('/profile', protect, employeeController.getProfile);

// --- NEW ROUTES FOR ADMIN APPROVALS ---
// Note: Abhi ke liye ye direct khule hain taaki Android app test ho sake. 
// Baad mein hum inke aage 'protect' laga denge security ke liye.
router.get('/pending', employeeController.getPendingApprovals);
router.put('/approve/:id', employeeController.approveEmployee);

module.exports = router;