// File: src/controllers/notificationController.js
const notificationService = require('../services/notificationService');
const Employee = require('../models/EmployeeModel');

const getMyNotifications = async (req, res) => {
    try {
        const notifications = await notificationService.getMyNotifications(req.user.id);
        res.status(200).json({ success: true, data: notifications });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

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

// 👇 Ekdum final line jo sab kuch export kar rahi hai
module.exports = { getMyNotifications, syncFcmToken, testPushNotification };