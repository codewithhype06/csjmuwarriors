// File: src/controllers/notificationController.js
const notificationService = require('../services/notificationService'); // <-- FIXED: Capital 'S'
const Employee = require('../models/EmployeeModel');

// 1. Fetch all alerts for the logged-in user
const getMyNotifications = async (req, res) => {
    try {
        const notifications = await notificationService.getMyNotifications(req.user.id);
        res.status(200).json({ success: true, data: notifications });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 2. The Auto-Sync Token Receiver
const syncFcmToken = async (req, res) => {
    try {
        const { fcmToken } = req.body;
        await Employee.findByIdAndUpdate(req.user.id, { fcmToken: fcmToken });
        res.status(200).json({ success: true, message: "Phone connected to Backend!" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const testPushNotification = async (req, res) => {
    try {
        // Hum khud ko hi (logged-in user ko) notification bhej rahe hain test ke liye
        await notificationService.sendPushNotification(
            req.user.id,
            "🚀 CSJMU Warriors LIVE!",
            "Bhai! Tumhara Push Notification system ekdum perfect kaam kar raha hai!"
        );
        res.status(200).json({ success: true, message: "Test notification sent!" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { getMyNotifications, syncFcmToken };