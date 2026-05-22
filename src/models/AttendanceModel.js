// File: src/models/Attendance.js
const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    employee: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Employee', 
        required: true 
    },
    date: { type: String, required: true }, // e.g., "YYYY-MM-DD"
    time: { type: String, required: true }, // e.g., "10:00 AM"
    location: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
    },
    selfieImage: { type: String, required: true } // Base64 string of the selfie
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);