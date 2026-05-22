// File: src/controllers/payrollController.js
const payrollService = require('../services/payrollService');

const createPayslip = async (req, res) => {
    try {
        // FULLY AUTOMATED: Admin only says "Generate May 2026 for this ID"
        const { employeeId, month, year } = req.body;
        
        const payslip = await payrollService.generatePayslip(employeeId, month, year);
        
        res.status(201).json({ success: true, message: "Automated Payslip generated!", data: payslip });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const getMyPayslips = async (req, res) => {
    try {
        const payslips = await payrollService.getMyPayslips(req.user.id);
        res.status(200).json({ success: true, data: payslips });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { createPayslip, getMyPayslips };