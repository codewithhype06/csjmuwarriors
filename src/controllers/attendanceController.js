// File: src/controllers/attendanceController.js
const attendanceService = require('../services/attendanceService');
const Attendance = require('../models/AttendanceModel');
// 👇 ADDED: Employee model to fetch name before check-in
const Employee = require('../models/EmployeeModel'); 

const checkIn = async (req, res) => {
    try {
        const { latitude, longitude } = req.body;

        const attendance = await attendanceService.markCheckIn(
            req.user.id, 
            latitude, 
            longitude
        );
        
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

const getTodayStatus = async (req, res) => {
    try {
        const today = new Date().toISOString().split('T')[0];
        const attendance = await Attendance.findOne({ employee: req.user.id, date: today })
                                         .populate('employee', 'name bvgId');
        
        if (!attendance) {
            // 👇 THE FIX: Fetching employee details even if not checked in yet
            const emp = await Employee.findById(req.user.id);
            const empName = emp ? emp.name : "Warrior";
            const empBvgId = emp ? emp.bvgId : "STAFF";

            return res.status(200).json({ 
                success: true, 
                data: { 
                    status: 'NOT_CHECKED_IN',
                    name: empName,
                    bvgId: empBvgId
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