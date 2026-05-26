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
        required: true 
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
        type: String 
    },
    // ✨ NEW: OVERTIME TRACKING FIELDS ✨
    overtimeReason: { 
        type: String,
        default: null
    },
    overtimeStatus: {
        type: String,
        enum: ['NONE', 'PENDING', 'APPROVED', 'REJECTED'],
        default: 'NONE'
    }
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);