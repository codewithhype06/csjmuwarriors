// File: src/models/AttendanceModel.js
const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    // This links directly to the specific Employee in the database!
    employee: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Employee', 
        required: true 
    },
    // We store the date as a simple string (e.g., "2026-05-21") for easy searching
    date: { 
        type: String, 
        required: true 
    },
    checkInTime: { 
        type: Date, 
        required: true 
    },
    checkOutTime: { 
        type: Date, 
        default: null // Null until they actually check out
    },
    status: {
        type: String,
        enum: ['PRESENT', 'ABSENT', 'HALF-DAY'],
        default: 'PRESENT'
    }
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);