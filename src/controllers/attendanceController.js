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

// 👇 THE FIX: API to check today's status
const getTodayStatus = async (req, res) => {
    try {
        const today = new Date().toISOString().split('T')[0];
        const attendance = await Attendance.findOne({ employee: req.user.id, date: today });
        
        if (!attendance) {
            return res.status(200).json({ success: true, data: { status: 'NOT_CHECKED_IN' } });
        }

        if (attendance.checkOutTime) {
             return res.status(200).json({ success: true, data: { status: 'CHECKED_OUT' } });
        }

        return res.status(200).json({ success: true, data: { status: 'CHECKED_IN' } });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { checkIn, checkOut, getTodayStatus };