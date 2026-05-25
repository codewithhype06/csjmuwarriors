// File: src/controllers/attendanceController.js
const attendanceService = require('../services/attendanceService');
// 👇 Added Attendance Model here to check status
const Attendance = require('../models/AttendanceModel');

const checkIn = async (req, res) => {
    try {
        const { latitude, longitude, selfieImage } = req.body;

        const attendance = await attendanceService.markCheckIn(
            req.user.id, 
            latitude, 
            longitude, 
            selfieImage
        );
        
        res.status(200).json({
            success: true,
            message: "Checked in successfully with location & selfie!",
            data: attendance
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const checkOut = async (req, res) => {
    try {
        const attendance = await attendanceService.markCheckOut(req.user.id);
        
        res.status(200).json({
            success: true,
            message: "Checked out successfully!",
            data: attendance
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// File: src/controllers/attendanceController.js (Sirf getTodayStatus wala hissa update karna hai)

const getTodayStatus = async (req, res) => {
    try {
        const today = new Date().toISOString().split('T')[0];
        // .populate() lagaya taaki Employee model se Name aur BVG ID mil jaye
        const attendance = await Attendance.findOne({ employee: req.user.id, date: today })
                                         .populate('employee', 'name bvgId');
        
        if (!attendance) {
            return res.status(200).json({ success: true, data: { status: 'NOT_CHECKED_IN' } });
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