// File: src/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protect } = require('../middlewares/authMiddleware'); 

// ==========================================
// EXISTING ROUTES: Approvals & Leaves
// ==========================================
router.get('/pending-employees', adminController.getPendingEmployees);
router.put('/approve-employee/:id', adminController.approveEmployee);
router.get('/pending-leaves', adminController.getPendingLeaves);
router.put('/update-leave/:id', adminController.updateLeaveStatus);

// ==========================================
// EXISTING ROUTES: Zones
// ==========================================
router.get('/zones', protect, adminController.getAllZones);
router.post('/zones', protect, adminController.createZone);

// ==========================================
// NEW ROUTES: Assignments
// ==========================================
router.post('/assignments', protect, adminController.createAssignment);

module.exports = router;