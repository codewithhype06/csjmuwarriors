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

module.exports = router;