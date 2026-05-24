// File: src/models/EmployeeModel.js
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true }, // Added Phone Number
    bvgId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['ADMIN', 'MANAGER', 'SUPERVISOR', 'STAFF'], 
        default: 'STAFF' 
    },
    // Add this inside src/models/EmployeeModel.js
    baseSalary: { 
        type: Number, 
        default: 15000 // Default automated salary, can be changed when hiring
    },
    // SECURITY GATE: Every new user defaults to false until an Admin approves them
    isApproved: { type: Boolean, default: false }, // 👇 YAHAN COMMA (,) ADD KAR DIYA HAI
    
    fcmToken: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);