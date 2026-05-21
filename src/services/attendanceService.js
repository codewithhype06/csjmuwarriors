// File: src/services/attendanceService.js
const Attendance = require('../models/AttendanceModel');

// Helper function to get today's date in YYYY-MM-DD format
const getTodayDateString = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Returns "2026-05-21"
};

// --- MARK CHECK-IN ---
const markCheckIn = async (employeeId) => {
    const todayStr = getTodayDateString();

    // 1. Check if the user already checked in today
    const existingAttendance = await Attendance.findOne({ employee: employeeId, date: todayStr });
    if (existingAttendance) {
        throw new Error("You have already checked in for today!");
    }

    // 2. Create a new attendance record
    const newAttendance = new Attendance({
        employee: employeeId,
        date: todayStr,
        checkInTime: new Date() // Records the exact current time
    });

    await newAttendance.save();
    return newAttendance;
};

// --- MARK CHECK-OUT ---
const markCheckOut = async (employeeId) => {
    const todayStr = getTodayDateString();

    // 1. Find today's attendance record
    const attendance = await Attendance.findOne({ employee: employeeId, date: todayStr });
    
    if (!attendance) {
        throw new Error("No check-in record found for today. Please check in first.");
    }
    
    if (attendance.checkOutTime) {
        throw new Error("You have already checked out for today!");
    }

    // 2. Update the checkOut time
    attendance.checkOutTime = new Date();
    await attendance.save();
    
    return attendance;
};

module.exports = { markCheckIn, markCheckOut };