// File: src/controllers/leaveController.js
const leaveService = require('../services/leaveService');
const Leave = require('../models/LeaveModel'); // Direct import for admin
const Notification = require('../models/NotificationModel'); // For saving history
const notificationService = require('../services/notificationService'); // For FCM Push

const applyLeave = async (req, res) => {
    try {
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

// ✨ NEW: Admin Approval Logic with Push Notifications
const adminApproveLeave = async (req, res) => {
    try {
        const leaveId = req.params.id;
        const { status } = req.body; // 'APPROVED' or 'REJECTED'

        // 1. Update the Leave in MongoDB
        const updatedLeave = await Leave.findByIdAndUpdate(
            leaveId, 
            { status: status }, 
            { new: true }
        );

        if (!updatedLeave) {
            return res.status(404).json({ success: false, message: "Leave not found" });
        }

        // 2. Save Notification to Database for History
        const messageText = `Your leave request for ${updatedLeave.leaveType} has been ${status}.`;
        await Notification.create({
            employee: updatedLeave.employee,
            title: "Leave Status Updated",
            message: messageText
        });

        // 3. Fire FCM Push Notification to the Employee's Phone
        if (notificationService && notificationService.sendPushNotification) {
            await notificationService.sendPushNotification(
                updatedLeave.employee,
                "Leave Status Updated",
                messageText
            );
        }

        res.status(200).json({
            success: true,
            message: `Leave ${status} successfully! Notification Sent.`,
            data: updatedLeave
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { applyLeave, getMyLeaves, adminApproveLeave };