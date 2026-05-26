// File: src/controllers/attendanceController.js
const attendanceService = require('../services/attendanceService');
const Attendance = require('../models/AttendanceModel');
const Employee = require('../models/EmployeeModel'); 

const checkIn = async (req, res) => {
    try {
        const { latitude, longitude } = req.body;
        const attendance = await attendanceService.markCheckIn(req.user.id, latitude, longitude);
        
        res.status(200).json({
            success: true,
            message: "Verified and Checked in successfully!",
            data: attendance
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const checkOut = async (req, res) => {
    try {
        // 👇 Capture overtime reason from Android app
        const { overtimeReason } = req.body || {};

        // 1. Mark normal checkout via your existing service
        const attendance = await attendanceService.markCheckOut(req.user.id);
        
        // 2. ✨ THE SMART OVERTIME ENGINE ✨
        // Calculate total hours worked in milliseconds converted to hours
        const hoursWorked = (attendance.checkOutTime - attendance.checkInTime) / (1000 * 60 * 60);

        // Agar 9 ghante se upar kaam kiya hai aur reason diya hai, toh OT pending mark karo
        if (hoursWorked >= 9 && overtimeReason) {
            attendance.overtimeReason = overtimeReason;
            attendance.overtimeStatus = 'PENDING';
            await attendance.save(); // Save the updated status
        }

        res.status(200).json({
            success: true,
            message: "Checked out successfully!",
            data: attendance,
            overtimeLogged: hoursWorked >= 9 && !!overtimeReason
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const getTodayStatus = async (req, res) => {
    try {
        const today = new Date().toISOString().split('T')[0];
        const attendance = await Attendance.findOne({ employee: req.user.id, date: today })
                                         .populate('employee', 'name bvgId');
        
        if (!attendance) {
            const emp = await Employee.findById(req.user.id);
            return res.status(200).json({ 
                success: true, 
                data: { 
                    status: 'NOT_CHECKED_IN',
                    name: emp ? emp.name : "Warrior",
                    bvgId: emp ? emp.bvgId : "STAFF"
                } 
            });
        }

        const empName = attendance.employee?.name || "Warrior";
        const empBvgId = attendance.employee?.bvgId || "STAFF";

        if (attendance.checkOutTime) {
             return res.status(200).json({ 
                 success: true, 
                 data: { 
                     status: 'CHECKED_OUT', 
                     checkInTime: attendance.checkInTime, 
                     checkOutTime: attendance.checkOutTime,
                     name: empName,
                     bvgId: empBvgId,
                     date: attendance.date
                 } 
             });
        }

        return res.status(200).json({ 
            success: true, 
            data: { 
                status: 'CHECKED_IN', 
                checkInTime: attendance.checkInTime,
                name: empName,
                bvgId: empBvgId,
                date: attendance.date
            } 
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { checkIn, checkOut, getTodayStatus };