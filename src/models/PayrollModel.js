// File: src/models/PayrollModel.js
const mongoose = require('mongoose');

const payrollSchema = new mongoose.Schema({
    employee: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Employee', 
        required: true 
    },
    month: { 
        type: String, 
        required: true // e.g., "05" for May
    },
    year: { 
        type: String, 
        required: true // e.g., "2026"
    },
    baseSalary: { 
        type: Number, 
        required: true 
    },
    presentDays: { 
        type: Number, 
        required: true 
    },
    netSalary: { 
        type: Number, 
        required: true 
    }
}, { timestamps: true });

module.exports = mongoose.model('Payroll', payrollSchema);