// File: src/controllers/attendanceController.js
const attendanceService = require('../services/attendanceService');

const checkIn = async (req, res) => {
    try {
        // MAGIC: User ID aayegi token se, baaki data aayega Android app se!
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

module.exports = { checkIn, checkOut };