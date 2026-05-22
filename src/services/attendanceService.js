// File: src/services/attendanceService.js
const Attendance = require('../models/Attendance');

const markCheckIn = async (userId, latitude, longitude, selfieImage) => {
    // Check if already checked in today
    const today = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
    const existingAttendance = await Attendance.findOne({
        employee: userId,
        date: today
    });

    if (existingAttendance) {
        throw new Error("You have already checked in today.");
    }

    const newAttendance = await Attendance.create({
        employee: userId,
        date: today,
        checkInTime: new Date().toLocaleTimeString(),
        location: {
            latitude: latitude || 0,
            longitude: longitude || 0
        },
        selfieImage: selfieImage || "No Selfie Provided"
    });

    return newAttendance;
};

const markCheckOut = async (userId) => {
    const today = new Date().toISOString().split('T')[0];
    const attendance = await Attendance.findOne({
        employee: userId,
        date: today
    });

    if (!attendance) {
        throw new Error("No check-in found for today.");
    }

    if (attendance.checkOutTime) {
        throw new Error("You have already checked out today.");
    }

    attendance.checkOutTime = new Date().toLocaleTimeString();
    await attendance.save();

    return attendance;
};

module.exports = { markCheckIn, markCheckOut };