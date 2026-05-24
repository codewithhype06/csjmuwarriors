// File: src/services/notificationservice.js
const admin = require('../config/firebase');

const Notification = require('../models/NotificationModel'); // <-- FIXED: Exact CamelCase
const Employee = require('../models/EmployeeModel');

const sendPushNotification = async (employeeId, title, message) => {
    const newNotification = new Notification({ employee: employeeId, title, message });
    await newNotification.save();

    const employee = await Employee.findById(employeeId);
    if (employee && employee.fcmToken) {
        const payload = { notification: { title, body: message }, token: employee.fcmToken };
        try {
            await admin.messaging().send(payload);
        } catch (error) {
            console.error("Firebase sending error:", error.message);
        }
    }
    return newNotification;
};

const getMyNotifications = async (employeeId) => {
    return await Notification.find({ employee: employeeId }).sort({ createdAt: -1 });
};

module.exports = { sendPushNotification, getMyNotifications };