// File: src/services/attendanceService.js
const Attendance = require('../models/AttendanceModel');

const markCheckIn = async (employeeId, latitude, longitude, selfieImage) => {
    // Get current date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    // Check if the user has already checked in today
    const existingAttendance = await Attendance.findOne({ employee: employeeId, date: today });
    if (existingAttendance) {
        throw new Error("You have already checked in today!");
    }

    // Create new attendance record
    const newAttendance = new Attendance({
        employee: employeeId,
        date: today,
        checkInTime: new Date(),
        checkInLocation: { latitude, longitude },
        selfieImage
    });

    await newAttendance.save();
    return newAttendance;
};

const markCheckOut = async (employeeId) => {
    const today = new Date().toISOString().split('T')[0];

    // Find today's check-in
    const attendance = await Attendance.findOne({ employee: employeeId, date: today });
    
    if (!attendance) {
        throw new Error("No check-in record found for today. Please check in first.");
    }
    if (attendance.checkOutTime) {
        throw new Error("You have already checked out today!");
    }

    // Update with check-out time
    attendance.checkOutTime = new Date();
    await attendance.save();
    return attendance;
};

module.exports = { markCheckIn, markCheckOut };