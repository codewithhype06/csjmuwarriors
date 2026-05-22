// File: src/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Agar tumhara authMiddleware export 'protect' use karta hai, toh use yahan import kiya hai
const { protect } = require('../middlewares/authMiddleware'); 

// ==========================================
// EXISTING ROUTES: Approvals & Leaves
// ==========================================
router.get('/pending-employees', adminController.getPendingEmployees);
router.put('/approve-employee/:id', adminController.approveEmployee);
router.get('/pending-leaves', adminController.getPendingLeaves);
router.put('/update-leave/:id', adminController.updateLeaveStatus);

// ==========================================
// NEW ROUTES: Dynamic Zone Management
// ==========================================
// GET /api/v1/admin/zones -> Android app yahan se list fetch karegi
router.get('/zones', protect, adminController.getAllZones);

// POST /api/v1/admin/zones -> Manager/Admin yahan se naye zones add karenge
router.post('/zones', protect, adminController.createZone);

module.exports = router;