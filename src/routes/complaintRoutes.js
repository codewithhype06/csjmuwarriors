// File: src/routes/complaintRoutes.js
const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');

const { protect } = require('../middlewares/authMiddleware');
const { adminOnly } = require('../middlewares/adminMiddleware');

// --- STAFF ROUTES (Requires Login) ---
router.post('/raise', protect, complaintController.submitComplaint);
router.get('/my-complaints', protect, complaintController.getMyComplaints);

// --- ADMIN ROUTES (Requires Login + Admin/Manager Role) ---
router.get('/admin/all', protect, adminOnly, complaintController.getAllComplaints);
router.put('/admin/update/:id', protect, adminOnly, complaintController.updateStatus);

module.exports = router;