const Attendance = require('../models/AttendanceModel');

const markCheckIn = async (employeeId, latitude, longitude) => {
    const today = new Date().toISOString().split('T')[0];

    const existingAttendance = await Attendance.findOne({ employee: employeeId, date: today });
    if (existingAttendance) {
        throw new Error("You have already checked in today!");
    }

    const newAttendance = new Attendance({
        employee: employeeId,
        date: today,
        checkInTime: new Date(),
        checkInLocation: { latitude, longitude }
        // selfieImage field completely removed!
    });

    await newAttendance.save();
    return newAttendance;
};

const markCheckOut = async (employeeId) => {
    const today = new Date().toISOString().split('T')[0];
    const attendance = await Attendance.findOne({ employee: employeeId, date: today });
    
    if (!attendance) throw new Error("No check-in record found for today.");
    if (attendance.checkOutTime) throw new Error("You have already checked out today!");

    attendance.checkOutTime = new Date();
    await attendance.save();
    return attendance;
};

module.exports = { markCheckIn, markCheckOut };