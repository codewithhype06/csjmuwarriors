// File: src/models/PayrollModel.js
const mongoose = require('mongoose');

const payrollSchema = new mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    month: { type: String, required: true },
    year: { type: String, required: true },
    baseWage: { type: Number, required: true }, // Pulled automatically from Employee profile
    
    // Auto-Calculated Stats
    fullDays: { type: Number, default: 0 },
    halfDays: { type: Number, default: 0 },
    absentDays: { type: Number, default: 0 },
    overtimeHours: { type: Number, default: 0 },
    
    // Auto-Calculated Finances
    overtimePay: { type: Number, default: 0 },
    totalDeductions: { type: Number, default: 0 },
    netPay: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Payroll', payrollSchema);