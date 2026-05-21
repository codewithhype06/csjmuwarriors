// File: src/controllers/attendanceController.js
const attendanceService = require('../services/attendanceService');

const checkIn = async (req, res) => {
    try {
        // MAGIC: We don't ask for the user's ID in the body. 
        // Our 'protect' middleware already attached it securely from the JWT!
        const attendance = await attendanceService.markCheckIn(req.user.id);
        
        res.status(200).json({
            success: true,
            message: "Checked in successfully!",
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

module.exports = { checkIn, checkOut };