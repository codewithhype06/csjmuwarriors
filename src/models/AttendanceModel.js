// File: src/models/AttendanceModel.js
const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    employee: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Employee', 
        required: true 
    },
    date: { 
        type: String, 
        required: true // Format: YYYY-MM-DD for easy querying
    },
    checkInTime: { 
        type: Date, 
        required: true 
    },
    checkOutTime: { 
        type: Date 
    },
    checkInLocation: {
        latitude: { type: String },
        longitude: { type: String }
    },
    selfieImage: { 
        type: String // Stores the Base64 string from Android
    }
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);