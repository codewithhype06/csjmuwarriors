// File: src/models/EmployeeModel.js
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true }, 
    bvgId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['ADMIN', 'MANAGER', 'SUPERVISOR', 'STAFF'], 
        default: 'STAFF' 
    },
    baseSalary: { 
        type: Number, 
        default: 15000 
    },
    isApproved: { type: Boolean, default: false }, 
    fcmToken: { type: String, default: "" },

    // 👇 --- NEW: KYC & PERSONAL DETAILS FIELDS --- 👇
    aadhaar: { type: String, default: "Not Updated" },
    pan: { type: String, default: "Not Updated" },
    bloodGroup: { type: String, default: "Not Updated" },
    zone: { type: String, default: "Not Assigned" },
    shift: { type: String, default: "Not Assigned" }

}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);