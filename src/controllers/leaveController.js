// File: src/controllers/leaveController.js
const leaveService = require('../services/leaveService');

const applyLeave = async (req, res) => {
    try {
        // req.user.id comes from the JWT VIP Pass!
        const leave = await leaveService.applyForLeave(req.user.id, req.body);
        
        res.status(201).json({
            success: true,
            message: "Leave application submitted successfully! Pending Admin approval.",
            data: leave
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const getMyLeaves = async (req, res) => {
    try {
        const leaves = await leaveService.getMyLeaves(req.user.id);
        
        res.status(200).json({
            success: true,
            data: leaves
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { applyLeave, getMyLeaves };