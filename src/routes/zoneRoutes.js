const express = require('express');
const router = express.Router();
const zoneController = require('../controllers/zoneController');

// 1. GET ALL ZONES -> URL: /api/admin/zones (ya jo bhi aapka prefix ho)
router.get('/', zoneController.getAllZones);

// 2. CREATE NEW ZONE -> URL: /api/admin/zones
router.post('/', zoneController.createZone);

// 3. GET EMPLOYEES OF A ZONE -> URL: /api/admin/zones/:id/employees
router.get('/:id/employees', zoneController.getZoneEmployees);

module.exports = router;